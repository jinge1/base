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

    // 未发生位移，不处理
    if (lockDirection === '' && lastDirection === '') {
      return false
    }
    if (lockDirection === '') {
      lockDirection = lastDirection
    }
    if (lastDirection === '') {
      lastDirection = lockDirection
    }

    if (lastDirection === lockDirection) {
      this.toMove(lockDirection, differX, differY)
    } else {
      console.log('change move')
    }
    this.lockDirection = lockDirection

    // console.log('lastDirection: ', lastDirection)

    if (typeof moveEvent === 'function') {
      this.moveEvent(e)
    }
  }

  toMove(direction, differX, differY) {
    let {
      moveIndex,
      layout,
      renderList,
      spaceWidth
    } = this
    let {left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight} = renderList[moveIndex]
    let {left: originLeft, top: originTop} = this.getRenderDetail(layout[moveIndex])
    let nextLeft = originLeft + differX
    let nextTop = originTop + differY
    let moveDirection = ''
    if(direction === 'h'){
      moveDirection = nextLeft - currentLeft > 0 ? 'right' : 'left'
      let findItem = renderList.find(({
        left: itemLeft,
        top: itemTop,
        width: itemWidth,
        height: itemHeight
      })=>{
        let isH = false
        let isV = (itemTop >= currentTop && itemTop < currentTop + currentHeight) || (itemTop < currentTop && itemTop + itemHeight > currentTop)
        if(moveDirection === 'right'){
          isH = itemLeft > currentLeft + currentWidth && itemLeft - (currentLeft + currentWidth) <= spaceWidth
        }
        if(moveDirection === 'left'){
          isH = itemLeft + itemWidth < currentLeft && currentLeft - (itemLeft + itemWidth)  <= spaceWidth
        }
        return isH && isV
      })
      console.log('findItem: ', findItem)
      if(!findItem){
        this.renderList[moveIndex].left = nextLeft
      }

    }
    if(direction === 'v'){
      moveDirection = nextTop - currentTop > 0 ? 'down' : 'up'
      this.renderList[moveIndex].top = nextTop
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

  /**
   * [setIndex 设置当前操作元素在renderList中的下标值]
   * @param {Number} index [下标值]
   */
  // setIndex(index) {
  //   this.currentIndex = index
  //
  //    初始化元素位移锁定方向
  //   this.lockDirection = ''
  // }

  updateRender(info) {
    let realDirection = this.getMoveDirection(info)
    let {differX, differY} = info
    this.setPosition(realDirection, differX, differY)
  }

  getMoveDirection({lastDirection, differX, differY}) {
    let {lockDirection, currentIndex, renderList, spaceWidth} = this
    let {
      x,
      y,
      hSize,
      vSize,
      left: currentLeft,
      top: currentTop
    } = renderList[currentIndex]
    let {left, top} = this.getRenderInfo({x, y, hSize, vSize})

    if (lockDirection === '') {
      lockDirection = lastDirection
    }

    if (lastDirection === '') {
      lastDirection = lockDirection
    }

    if (lockDirection !== '' && lockDirection !== lastDirection) {
      let nextDiffH = Math.abs(left + differX - currentLeft)
      let nextDiffV = Math.abs(top + differY - currentTop)
      let minChangeNum = spaceWidth * 2
      if ((lastDirection === 'h' && nextDiffH > minChangeNum) || (lastDirection === 'v' && nextDiffV > minChangeNum)) {
        lockDirection = lastDirection
      }
    }
    return lockDirection
  }

  setPosition(direction, differX = 0, differY = 0) {
    if (direction === '') {
      return false
    }
    let {
      lockDirection,
      singleWidth,
      currentIndex,
      renderList,
      spaceWidth,
      totalWidth,
      totalHeight
    } = this
    let {
      x,
      y,
      hSize,
      vSize,
      width,
      height,
      left: currentLeft,
      top: currentTop
    } = renderList[currentIndex]
    let {left, top} = this.getRenderInfo({x, y, hSize, vSize})
    let nextLeft = parseInt(left + differX)
    let nextTop = parseInt(top + differY)
    let maxH = parseInt(totalWidth - spaceWidth)
    let maxV = parseInt(totalHeight - spaceWidth)
    // let isCanMove = false
    // let isChanged = lockDirection === direction

    if (direction === 'h') {
      if (nextLeft < spaceWidth) {
        nextLeft = spaceWidth
      }
      if (nextLeft + width > maxH) {
        nextLeft = maxH - width
      }

      let hadOne = true

      if (differX > 0) { // right
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if (itemLeft > currentLeft + width && itemLeft - (currentLeft + width) < spaceWidth) {
            if (itemTop <= currentTop && itemTop + itemHeight > currentTop) {
              isFind = true
            }
            if (itemTop > currentTop && itemTop < currentTop + height) {
              isFind = true
            }
          }
          return isFind
        })

        if (!hadOne) {
          this.renderList[currentIndex].left = nextLeft
        }
      } else { // left
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if (itemLeft + itemWidth < currentLeft && currentLeft - (itemLeft + itemWidth) < spaceWidth) {
            if (itemTop <= currentTop && itemTop + itemHeight > currentTop) {
              isFind = true
            }
            if (itemTop > currentTop && itemTop < currentTop + height) {
              isFind = true
            }
          }
          return isFind
        })

        if (!hadOne) {
          this.renderList[currentIndex].left = nextLeft
        }
      }
    }

    if (direction === 'v') {
      if (nextTop < spaceWidth) {
        nextTop = spaceWidth
      }
      if (nextTop + height > maxV) {
        nextTop = maxV - height
      }

      let hadOne = true

      if (differY > 0) { // down
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if (itemTop > currentTop + height && itemTop - (currentTop + height) < spaceWidth) {

            if (itemLeft <= currentLeft && itemLeft + itemWidth > currentLeft) {
              isFind = true
            }
            if (itemLeft > currentLeft && itemLeft < currentLeft + width) {
              isFind = true
            }
          }
          return isFind
        })

        if (!hadOne) {
          this.renderList[currentIndex].top = nextTop
        }
      } else { // up
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if (itemTop + itemHeight < currentTop && currentTop - (itemTop + itemHeight) < spaceWidth) {

            if (itemLeft <= currentLeft && itemLeft + itemWidth > currentLeft) {
              isFind = true
            }
            if (itemLeft > currentLeft && itemLeft < currentLeft + width) {
              isFind = true
            }
          }
          return isFind
        })

        if (!hadOne) {
          this.renderList[currentIndex].top = nextTop
        }
      }
    }
    this.lockDirection = lockDirection
  }

  stopMove() {
    let {currentIndex, renderList, layout} = this
    let {left, top} = renderList[currentIndex]
    let {x, y} = this.getPosition(left, top)
    layout[currentIndex].x = x
    layout[currentIndex].y = y
    this.getRender(layout)
    if (typeof this.updatePosition === 'function') {
      this.updatePosition()
    }
  }

  changePosition(direction, differX, differY) {
    let {currentIndex, renderList, lockDirection} = this
    let {
      x,
      y,
      hSize,
      vSize,
      left: preLeft,
      top: preTop
    } = renderList[currentIndex]
    let {left, top} = this.getRenderInfo({x, y, hSize, vSize})
    // let nextLeft = preLeft
    // let nextTop = preTop
    let nextLeft = left + differX
    let nextTop = top + differY
    this.lockDirection = lockDirection
    if (direction === 'h') {
      if (differX < 0) {
        // console.log('left')
      }
      nextLeft = left + differX
      this.renderList[currentIndex].left = nextLeft
    }
    if (direction === 'v') {
      nextTop = top + differY
      this.renderList[currentIndex].top = nextTop
    }

    if (typeof this.updatePosition === 'function') {
      this.updatePosition()
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
