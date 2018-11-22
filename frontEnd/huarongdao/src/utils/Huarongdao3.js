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
    let {lockDirection, moveIndex, moveEvent, hSwipe} = this

    if (moveIndex < 0) {
      return false
    }

    let {moveInfo, lastInfo} = hSwipe
    let {differX, differY, direction} = moveInfo
    let {lastDirection, lastDirectionNum} = lastInfo


    if (lockDirection === '') {
      lockDirection = lastDirection
    }
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
      this.setLimitInfo()
      this.updateDetial(differX, differY)
    } else {
      console.log('change move')
    }


    if (typeof moveEvent === 'function') {
      this.moveEvent(e)
    }
  }

  updateDetial(differX, differY){
    let {
      moveIndex,
      maxInfo,
      lockDirection,
      layout,
      renderList
    } = this
    let {
      max,
      min
    } = maxInfo
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
    }
    if(lockDirection === 'v'){
      if(nextTop < min){
        nextTop = min
      }
      if(nextTop > max){
        nextTop = max
      }
      this.renderList[moveIndex].top = nextTop
    }
  }

  setLimitInfo(){
    let {
      moveIndex,
      isGetLimit,
      lockDirection,
      layout,
      renderList,
      spaceWidth,
      totalWidth,
      totalHeight,
      maxInfo
    } = this
    if(isGetLimit){
      return false
    }
    let {
      left: currentLeft,
      top: currentTop,
      width: currentWidth,
      height: currentHeight
    } = renderList[moveIndex]
    let {left: originLeft, top: originTop} = this.getRenderDetail(layout[moveIndex])

    let max = 0
    let min = spaceWidth
    let isFindRight = false
    let isFindLeft = false
    if(lockDirection === 'h'){
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

      this.maxInfo = {
        max,
        min
      }
      this.isGetLimit = true
    }
    if(lockDirection === 'v'){
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

      this.maxInfo = {
        max,
        min
      }
      this.isGetLimit = true
    }
  }

  /**
   * [onMove 滑动结束的处理]
   */
  endMove() {
    let {moveIndex} = this
    if (moveIndex < 0) {
      return false
    }
    if (typeof endEvent === 'function') {
      this.endEvent()
    }
  }

  getPosition(left, top) {
    let {spaceWidth, singleWidth} = this
    return {
      x: Math.round(left / (singleWidth + spaceWidth)),
      y: Math.round(top / (singleWidth + spaceWidth))
    }
  }

}
