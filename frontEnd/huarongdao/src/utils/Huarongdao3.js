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
    let {hSize, vSize, spaceScale, totalWidth} = this
    let spaceWidth = totalWidth * spaceScale
    let singleWidth = parseInt((totalWidth - spaceWidth * (hSize + 1)) / hSize)
    this.spaceWidth = spaceWidth
    this.singleWidth = singleWidth
    this.totalHeight = vSize * (spaceWidth + singleWidth) + spaceWidth
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
  }

  updateRender(info) {
    let realDirection = this.getMoveDirection(info)
    let {differX, differY} = info
    this.setPosition(realDirection, differX, differY)
  }

  getMoveDirection({lastDirection, differX, differY, lastDirectionNum}) {
    let {lockDirection, currentIndex, renderList, spaceWidth} = this
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
    if(direction === ''){
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
    let {left, top} = this.getRenderDetail({x, y, hSize, vSize})
    let nextLeft = left + differX
    let nextTop = top + differY
    let maxH = totalWidth - spaceWidth
    let maxV = totalHeight - spaceWidth
    let isCanMove = false
    let isChanged = lockDirection === direction

    if(direction === 'h'){
      if(nextLeft < spaceWidth ){
        nextLeft = spaceWidth
      }
      if(nextLeft + width > maxH ){
        nextLeft = maxH - width
      }

      let hadOne = true

      if(differX > 0){  // right
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if( itemLeft > currentLeft + width && itemLeft - (currentLeft + width) < spaceWidth ){
            if (itemTop <= currentTop && itemTop + itemHeight > currentTop) {
              isFind = true
            }
            if (itemTop > currentTop && itemTop < currentTop + height) {
              isFind = true
            }
          }
          return isFind
        })

        if(!hadOne){
          this.renderList[currentIndex].left = nextLeft
        }
      }else{  // left
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if( itemLeft + itemWidth < currentLeft && currentLeft - (itemLeft + itemWidth) < spaceWidth ){
            if (itemTop <= currentTop && itemTop + itemHeight > currentTop) {
              isFind = true
            }
            if (itemTop > currentTop && itemTop < currentTop + height) {
              isFind = true
            }
          }
          return isFind
        })

        if(!hadOne){
          this.renderList[currentIndex].left = nextLeft
        }
      }
    }

    if(direction === 'v'){
      if(nextTop < spaceWidth ){
        nextTop = spaceWidth
      }
      if(nextTop + height > maxV ){
        nextTop = maxV - height
      }


      let hadOne = true

      if(differY > 0){  // down
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if( itemTop > currentTop + height && itemTop - (currentTop + height) < spaceWidth ){

            if (itemLeft <= currentLeft && itemLeft + itemWidth > currentLeft) {
              isFind = true
            }
            if (itemLeft > currentLeft && itemLeft < currentLeft + width) {
              isFind = true
            }
          }
          return isFind
        })

        if(!hadOne){
          this.renderList[currentIndex].top = nextTop
        }
      }else{  // up
        hadOne = renderList.some(({left: itemLeft, top: itemTop, width: itemWidth, height: itemHeight}) => {
          let isFind = false
          if( itemTop + itemHeight < currentTop && currentTop - (itemTop + itemHeight) < spaceWidth ){

            if (itemLeft <= currentLeft && itemLeft + itemWidth > currentLeft) {
              isFind = true
            }
            if (itemLeft > currentLeft && itemLeft < currentLeft + width) {
              isFind = true
            }
          }
          return isFind
        })

        if(!hadOne){
          this.renderList[currentIndex].top = nextTop
        }
      }
    }
    this.lockDirection = lockDirection
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
