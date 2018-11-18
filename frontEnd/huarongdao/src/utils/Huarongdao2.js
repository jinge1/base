export default class Huarongdao {
  constructor({
    roles,
    hSize,
    vSize,
    spaceScale,
    width
  }) {
    this.roles = [...roles]
    // this.layout = [...layout]
    this.hSize = hSize
    this.vSize = vSize
      ? vSize
      : hSize
    this.spaceScale = spaceScale
    this.width = width
    this.init()
  }

  init() {
    let {hSize, spaceScale, width} = this
    let spaceWidth = width * spaceScale
    let singleWidth = parseInt((width - spaceWidth * (hSize + 1)) / hSize)
    this.spaceWidth = spaceWidth
    this.singleWidth = singleWidth
  }

  setRenderList(layout) {
    let {
      roles
    } = this
    layout = [...layout]
    let renderList = []
    layout.forEach(({role, x, y}) => {
      let roleInfo = roles.find(({role: currentRole}) => currentRole === role)
      let mixInfo = {
        x,
        y,
        ...roleInfo
      }
      let positionDetail = this.getPositionDetail(mixInfo)
      renderList.push({
        x,
        y,
        ...roleInfo,
        ...positionDetail
      })
    })
    this.renderList = renderList
  }

  getPositionDetail({x, y, hSize, vSize}) {
    let {spaceWidth, singleWidth} = this
    let width = hSize * singleWidth + (hSize - 1) * spaceWidth
    let height = vSize * singleWidth + (vSize - 1) * spaceWidth
    let left = x * singleWidth + spaceWidth * (x + 1)
    let top = y * singleWidth + spaceWidth * (y + 1)
    return {width, height, left, top}
  }

  setRole(index){
    this.currentIndex = index
  }

  setIndex(index) {
    this.currentIndex = index
    let {
      renderList,
      hSize: totalHSize,
      vSize: totalVize,
      spaceWidth,
      singleWidth
    } = this

    let {
      left,
      top,
      width,
      height,
      x,
      y,
      hSize,
      vSize
    } = renderList[index]

    let minH = left
    let maxH = left
    let leftNum = 0
    let rightNum = 0

    let minV = top
    let maxV = top
    let topNum = 0
    let bottomNum = 0

    if (x > 0) { // left
      for (let l = x - 1; l >= 0; l--) {
        let leftList = renderList.filter(({x: leftX, y: leftY, hSize: leftHSize, vSize: leftVSize}) => {
          let isHasItem = false
          for (let m = leftY; m < leftY + leftVSize; m++) {
            if (m >= y && m <= y + vSize - 1) {
              isHasItem = true
              break
            }
          }
          return leftX + leftHSize - 1 === l && isHasItem
        })
        if (leftList.length > 0) {
          break
        } else {
          leftNum = leftNum + 1
        }
      }
      minH = leftNum > 0 ? parseInt(left - (leftNum * (singleWidth + spaceWidth))) : left
    }

    if (x + hSize < totalHSize) { // right
      for (let r = x + hSize; r < totalHSize; r++) {
        let rightList = renderList.filter(({
          x: rightX,
          y: rightY,
          hSize: rightHSize,
          vSize: rightVSize
        }) => {
          let isHasItem = false
          for (let m = rightY; m < rightY + rightVSize; m++) {
            if (m >= y && m <= y + vSize - 1) {
              isHasItem = true
              break
            }
          }
          return rightX === r && isHasItem
        })
        if (rightList.length > 0) {
          break
        } else {
          rightNum = rightNum + 1
        }
      }
      maxH = rightNum > 0 ? parseInt(left + (rightNum * (singleWidth + spaceWidth))) : left
    }

    if (y > 0) { // top
      for (let t = y - 1; t >= 0; t--) {
        let topList = renderList.filter(({x: topX, y: topY, hSize: topHSize, vSize: topVSize}) => {
          let isHasItem = false
          for (let m = topX; m < topX + topHSize; m++) {
            if (m >= x && m <= x + hSize - 1) {
              isHasItem = true
              break
            }
          }
          return topY + topVSize - 1 === t && isHasItem
        })
        if (topList.length > 0) {
          break
        } else {
          topNum = topNum + 1
        }
      }
      minV = topNum > 0 ? parseInt(top - (topNum * (singleWidth + spaceWidth))) : top
    }

    if (y + vSize < totalVize) { // bottom
      for (let b = y + vSize; b < totalVize; b++) {
        let bottomList = renderList.filter(({x: bottomX, y: bottomY, hSize: bottomHSize, vSize: bottomVSize}) => {
          let isHasItem = false
          for (let m = bottomX; m < bottomX + bottomHSize; m++) {
            if (m >= x && m <= x + hSize - 1) {
              isHasItem = true
              break
            }
          }
          return bottomY === b && isHasItem
        })
        if (bottomList.length > 0) {
          break
        } else {
          bottomNum = bottomNum + 1
        }
      }
      maxV = bottomNum > 0 ? parseInt(top + (bottomNum * (singleWidth + spaceWidth))) : top
    }

    this.cachePosition = {
      minH,
      maxH,
      minV,
      maxV
    }
  }

  getLimit(direction, differX, differY){
    let {
      currentIndex,
      renderList,
      spaceScale
    } = this
    let {
      left,
      top,
      hSize,
      vSize
    } = renderList[currentIndex]
  }

  setPosition(direction, differX, differY){
    let {
      lockDirection,
      singleWidth,
      currentIndex,
      renderList
    } = this
    let {
      x,
      y,
      hSize,
      vSize
    } = renderList[currentIndex]
    let {
      left,
      top
    } = this.getPositionDetail({x, y, hSize, vSize})
    if(direction !== ''){
      lockDirection = lockDirection || direction
      console.log('direction: ', direction)
      if (direction === 'h' && Math.abs(differX) > singleWidth / 10) {
        direction = 'v'
      }else if(direction === 'v' && Math.abs(differY) > singleWidth / 10){
        direction = 'h'
      }
      this.lockDirection = direction
      this.changePosition(direction, differX, differY)
    }




    // let {
    //
    // } = this.getLimit()


  }

  changePosition(direction, differX, differY){
    let {
      currentIndex,
      renderList
    } = this
    let {
      x,
      y,
      hSize,
      vSize
    } = renderList[currentIndex]
    let {
      left,
      top
    } = this.getPositionDetail({x, y, hSize, vSize})
    if (direction === 'h'){
      this.renderList[currentIndex].left = left + differX
    }
    if (direction === 'v'){
      this.renderList[currentIndex].top = top + differY
    }

    if(typeof this.updatePosition === 'function'){
      this.updatePosition()
    }
  }

  getPosition(left, top){
    let {spaceWidth, singleWidth} = this
    return {
      x: Math.round(left / (singleWidth + spaceWidth)),
      y: Math.round(top / (singleWidth + spaceWidth))
    }
  }

}
