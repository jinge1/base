export default class Huarongdao {
  constructor({roles, hSize, vSize, spaceScale, width}) {
    this.roles = [...roles]
    // this.layout = [...layout]
    this.hSize = hSize
    this.vSize = vSize
      ? vSize
      : hSize
    this.spaceScale = spaceScale
    this.totalWidth = width
    this.init()
  }

  init() {
    let {hSize, spaceScale, totalWidth} = this
    let spaceWidth = totalWidth * spaceScale
    let singleWidth = parseInt((totalWidth - spaceWidth * (hSize + 1)) / hSize)
    this.spaceWidth = spaceWidth
    this.singleWidth = singleWidth
  }

  setRenderList(layout) {
    let {roles} = this
    layout = [...layout]
    let renderList = []
    layout.forEach(({role, x, y}) => {
      let roleInfo = roles.find(({role: currentRole}) => currentRole === role)
      let mixInfo = {
        x,
        y,
        ...roleInfo
      }
      let positionDetail = this.getRenderDetail(mixInfo)
      renderList.push({
        x,
        y,
        ...roleInfo,
        ...positionDetail
      })
    })
    this.renderList = renderList
  }

  getRenderDetail({x, y, hSize, vSize}) {
    let {spaceWidth, singleWidth} = this
    let width = hSize * singleWidth + (hSize - 1) * spaceWidth
    let height = vSize * singleWidth + (vSize - 1) * spaceWidth
    let left = x * singleWidth + spaceWidth * (x + 1)
    let top = y * singleWidth + spaceWidth * (y + 1)
    return {width, height, left, top}
  }

  setIndex(index) {
    this.currentIndex = index
    this.lockDirection = ''
    // this.checkRight()
    // this.checkLeft()
  }

  checkRight() {
    let {
      currentIndex,
      renderList,
      hSize: totalHSize,
      vSize: totalVize,
      spaceWidth,
      singleWidth
    } = this
    let {left, top, width, height} = renderList[currentIndex]
    let had = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
      let flg = false
      if (itemTop <= top && itemTop + itemHeight > top) {
        flg = true
      }

      if (itemTop > top && itemTop < top + height) {
        flg = true
      }

      return flg && itemLeft > left + width && itemLeft - (left + width) < singleWidth
    })
    console.log('had: ', had)

  }

  checkLeft() {
    let {
      currentIndex,
      renderList,
      hSize: totalHSize,
      vSize: totalVize,
      spaceWidth,
      singleWidth
    } = this
    let {left, top, width, height} = renderList[currentIndex]
    let had = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
      let flg = false
      if (itemTop <= top && itemTop + itemHeight > top) {
        flg = true
      }

      if (itemTop > top && itemTop < top + height) {
        flg = true
      }

      return flg && itemLeft + itemWidth < left && left - (itemLeft + itemWidth) < singleWidth
    })
    console.log('had: ', had)
  }

  updateRender(info) {
    let direction = this.geMoveDirection(info)
    this.setPosition(direction, differX, differY)
  }

  geMoveDirection({lastDirection, differX, differY, lastDirectionNum}) {
    let {lockDirection, singleWidth, currentIndex, renderList, spaceWidth} = this
    let {
      x,
      y,
      hSize,
      vSize,
      left: currentLeft,
      top: currentTop
    } = renderList[currentIndex]
    let {left, top} = this.getRenderDetail({x, y, hSize, vSize})

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
    let {
      lockDirection,
      singleWidth,
      currentIndex,
      renderList,
      spaceWidth,
      totalWidth
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
    let {left, top} = this.getRenderDetail({x, y, hSize, vSize})
    let nextLeft = left + differX
    let nextTop = top + differY
    let maxLeft = totalWidth - spaceWidth
    if(direction === 'h'){
      if(differX > 0){  // right
        if(nextLeft + width > maxLeft){

        }
      }else{  // left
        if(nextLeft < spaceWidth){

        }
      }
    }

    if(direction === 'v'){
      if(differY > 0){  // bottom

      }else{  // top

      }
    }
    // this.lockDirection = lockDirection
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
    let {left, top} = this.getRenderDetail({x, y, hSize, vSize})
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
