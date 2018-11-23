import Swipe from './VSwipe2'

/**
 * [Huarongdao 华容道游戏类，类似华容道游戏使用]
 */
export default class Huarongdao {
  /**
   * [constructor 初始化操作]
   * @param {Object} roles      [角色列表，{role: '角色类型标识', hSize: '横轴单位长度个数', vSize: '纵轴单位长度个数'}]
   * @param {Object} layout     [布局列表, {role: '角色类型标识', x: '横轴单位坐标', y: '纵单位坐标'}]
   * @param {String} datasetKey [通过元素的dataset来获取元素下标的key字符串，默认为index]
   * @param {Number} hSize      [横轴总单位长度个数，单位长度：最小角色宽度为1]
   * @param {Number} vSize      [纵轴总单位长度个数，没有该参数则取hSize值]
   * @param {Number} spaceScale [角色间隙比例值，为与横轴方向总长度所占比例值]
   * @param {Number} width      [横轴总长度]
   */
  constructor({
    ele,
    roles,
    layout,
    datasetKey,
    hSize,
    vSize,
    spaceScale
  }) {
    this.ele = typeof ele === 'string'
      ? document.querySelector(ele)
      : ele
    this.roles = [...roles]
    this.layout = [...layout]
    this.datasetKey = datasetKey || 'index'
    this.hSize = hSize
    this.vSize = vSize
      ? vSize
      : hSize
    this.spaceScale = spaceScale
    this.init()
    this.setSwipe()
  }

  /**
   * [init 初始化，计算间隙宽度，单位长度，整体高度等，并进行初始渲染]
   */
  init() {
    let {ele, hSize, vSize, spaceScale} = this
    let totalWidth = parseInt(document.defaultView.getComputedStyle(ele, null).width)
    let spaceWidth = parseInt(totalWidth * spaceScale)
    let singleWidth = parseInt((totalWidth - spaceWidth * (hSize + 1)) / hSize)
    this.spaceWidth = spaceWidth
    this.singleWidth = singleWidth
    this.totalWidth = totalWidth
    this.totalHeight = vSize * (spaceWidth + singleWidth) + spaceWidth
    this.renderList = this.getRenderList()
  }

  /**
   * [getRenderList 结合角色列表roles与布局列表layout，生成渲染列表renderList]
   */
  getRenderList() {
    let {layout} = this
    let renderList = []
    layout.forEach(item => {
      let renderInfo = this.getRenderDetail(item)
      renderList.push({
        ...renderInfo
      })
    })
    return renderList
  }

  /**
   * [getRenderDetail 根据某个布局信息，生成布局详情]
   * @param  {Number} role [角色类型]
   * @param  {Number} x    [角色x轴坐标点相对单位长度个数]
   * @param  {Number} y    [角色y轴坐标点相对单位长度个数]
   * @return {Object}      [具体布局信息]
   */
  getRenderDetail({role, x, y}) {
    let {roles, spaceWidth, singleWidth} = this
    let roleInfo = roles.find(({role: itemRole}) => itemRole === role)
    let {
      hSize,
      vSize,
      ...other
    } = roleInfo
    let width = hSize * singleWidth + (hSize - 1) * spaceWidth
    let height = vSize * singleWidth + (vSize - 1) * spaceWidth
    let left = x * singleWidth + spaceWidth * (x + 1)
    let top = y * singleWidth + spaceWidth * (y + 1)
    return {
      width,
      height,
      left,
      top,
      ...other
    }
  }

  /**
   * [给元素绑定滑动事件]
   */
  setSwipe() {
    let {ele} = this
    let hSwipe = new Swipe(ele)

    hSwipe.start = (e) => {
      this.beforeMove(e)
    }

    hSwipe.move = (e) => {
      this.onMove(e)
    }

    hSwipe.end = () => {
      this.endMove()
    }

    this.hSwipe = hSwipe
  }

  /**
   * [beforeMove 开始滑动的处理]
   * @param  {Object} e [事件对象]
   */
  beforeMove(e) {
    let {datasetKey, startEvent} = this
    let index = -1
    let lockDirection = ''
    if (e && e.target) {
      let datasetIndex = e.target.dataset[datasetKey]
      if (!isNaN(datasetIndex)) {
        index = datasetIndex
      }
    }
    this.moveIndex = index
    this.lockDirection = lockDirection
    this.isGetLimit = false
    if (typeof startEvent === 'function') {
      this.startEvent(e)
    }
  }

  /**
   * [onMove 滑动中的处理]
   * @param  {Object} e [事件对象]
   */
  onMove(e) {
    let {lockDirection, moveIndex, moveEvent, hSwipe, isGetLimit} = this

    if (moveIndex < 0) {
      return false
    }

    let {moveInfo, lastInfo} = hSwipe
    let {differX, differY} = moveInfo
    let {lastDirection} = lastInfo

    // 锁定方向设置
    if (lockDirection === '') {
      lockDirection = lastDirection
    }

    // 修正运动方向（lastDirection可能为空）
    if (lastDirection === '') {
      lastDirection = lockDirection
    }

    // 未发生位移，不处理
    if (lockDirection === '') {
      return false
    }

    if (lastDirection === lockDirection) {
      // 设置锁定信息
      this.lockDirection = lockDirection
      if(!isGetLimit){
        // let limitInfo = this.getLimitInfo(lockDirection)
        this.limitInfo = this.getLimitInfo(lockDirection)
        this.isGetLimit = true
      }


      this.updatePosition(differX, differY)
    } else {
      let isCanbeChange = this.getChangeInfo(lastDirection, differX, differY)
      console.log('change move')
    }


    if (typeof moveEvent === 'function') {
      this.moveEvent(e)
    }
  }

  getChangeInfo(lastDirection, differX, differY){
    let {
      moveIndex,
      layout,
      lockDirection,
      renderList,
      singleWidth,
      spaceWidth
    } = this
    let {
      left: currentLeft,
      top: currentTop,
      width: currentWidth,
      height: currentHeight
    } = renderList[moveIndex]
    let {left, top} = this.getRenderDetail(layout[moveIndex])

    let nextLeft = left + differX
    let nextTop = top + differY

    if(lastDirection === 'h'){
      // 计算距离单位长度的差距
      let disH = currentTop/(spaceWidth + singleWidth)
      disH = Math.abs( Math.round(disH) - disH ) * (spaceWidth + singleWidth)
      if( parseInt(disH) <= spaceWidth * 1.5 ){
        let limitInfo = this.getLimitInfo(lastDirection)
        let {
          min,
          max
        } = limitInfo
        // right
        if((nextLeft - currentLeft < 0 ) && currentLeft > min || (nextLeft - currentLeft > 0 && currentLeft < max)){
          console.log('yes')
        }else{
          console.log('no')
        }
      }else{
        console.log('no')
        // return false
      }
    }

    if(lastDirection === 'v'){
      // 计算距离单位长度的差距
      let disV = currentLeft/(spaceWidth + singleWidth)
      disV = Math.abs( Math.round(disV) - disV ) * (spaceWidth + singleWidth)
      if( parseInt(disV) <= spaceWidth * 1.5 ){
        let limitInfo = this.getLimitInfo(lastDirection)
        let {
          min,
          max
        } = limitInfo
        // right
        if((nextTop - currentTop < 0 ) && currentTop > min || (nextTop - currentTop > 0 && currentTop < max)){
          console.log('yes')
        }else{
          console.log('no')
        }
      }else{
        console.log('no')
        // return false
      }
    }

  }

  updatePosition(differX, differY){
    let {
      moveIndex,
      limitInfo,
      lockDirection,
      layout,
      update
    } = this
    let {
      max,
      min
    } = limitInfo
    let {left, top} = this.getRenderDetail(layout[moveIndex])
    let nextLeft = left + differX
    let nextTop = top + differY
    if(lockDirection === 'h'){
      if(nextLeft < min){
        nextLeft = min
      }
      if(nextLeft > max){
        nextLeft = max
      }
      this.renderList[moveIndex].left = nextLeft

      if (typeof update === 'function') {
        this.update()
      }
    }
    if(lockDirection === 'v'){
      if(nextTop < min){
        nextTop = min
      }
      if(nextTop > max){
        nextTop = max
      }
      this.renderList[moveIndex].top = nextTop
      if (typeof update === 'function') {
        this.update()
      }
    }
  }

  getLimitInfo(direction){
    let {
      moveIndex,
      renderList,
      spaceWidth,
      totalWidth,
      totalHeight
    } = this
    let {
      left: currentLeft,
      top: currentTop,
      width: currentWidth,
      height: currentHeight
    } = renderList[moveIndex]

    let max = 0
    let min = spaceWidth
    let limitInfo = {}
    if(direction === 'h'){
      max = totalWidth - spaceWidth - currentWidth
      renderList.forEach(({
        left: itemLeft,
        top: itemTop,
        width: itemWidth,
        height: itemHeight
      }, index)=>{

        let isRight = itemLeft > currentLeft + currentWidth
        let isLeft = itemLeft + itemWidth < currentLeft
        let isV = (itemTop >= currentTop && itemTop < currentTop + currentHeight) || (itemTop < currentTop && itemTop + itemHeight > currentTop)
        if(isRight && isV){
          let nextMax = itemLeft - spaceWidth - currentWidth
          max = nextMax < max ? nextMax : max
        }
        if(isLeft && isV){
          let nextMin = itemLeft + itemWidth + spaceWidth
          min = nextMin > min ? nextMin : min
        }
      })

      limitInfo = {
        max,
        min
      }
    }
    if(direction === 'v'){
      max = totalHeight - spaceWidth - currentHeight
      renderList.forEach(({
        left: itemLeft,
        top: itemTop,
        width: itemWidth,
        height: itemHeight
      }, index)=>{
        let isDown = itemTop > currentTop + currentHeight
        let isUp = itemTop + itemHeight < currentTop
        let isH = (itemLeft >= currentLeft && itemLeft < currentLeft + currentWidth) || (itemLeft < currentLeft && itemLeft + itemWidth > currentLeft)
        if(isDown && isH){
          let nextMax = itemTop - spaceWidth - currentHeight
          max = nextMax < max ? nextMax : max
        }
        if(isUp && isH){
          let nextMin = itemTop + itemHeight + spaceWidth
          min = nextMin > min ? nextMin : min
        }
      })

      limitInfo = {
        max,
        min
      }
    }
    return limitInfo
  }

  /**
   * [onMove 滑动结束的处理]
   */
  endMove() {
    let {
      moveIndex,
      renderList,
      singleWidth,
      spaceWidth
    } = this
    if (moveIndex < 0) {
      return false
    }

    let {left, top, role} = renderList[moveIndex]
    let x = Math.round(left / (singleWidth + spaceWidth))
    let y = Math.round(top / (singleWidth + spaceWidth))

    let {left: nextLeft, top: nextTop} = this.getRenderDetail({
      role,
      x,
      y
    })

    this.layout[moveIndex].x = x
    this.layout[moveIndex].y = y
    this.renderList[moveIndex].left = nextLeft
    this.renderList[moveIndex].top = nextTop

    if (typeof endEvent === 'function') {
      this.endEvent()
    }
  }

}
