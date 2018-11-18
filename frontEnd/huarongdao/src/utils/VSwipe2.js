// 请求基类，可根据实际需要进行扩展
export default class TouchEvent {
  // element  绑定touch事件的元素
  constructor(element, disTime = 100, minNum = 7) {

    // 存储最后一段间隔事件的数据
    this.disTime = disTime

    // minNum  最小运动临界值值，小于这个值则认为未运动
    this.minNum = minNum

    // 绑定事件元素
    this.ele = typeof element === 'string'
      ? document.querySelector(element)
      : element

    // 获取当前环境支持的事件
    this.supportEvents = this.getSupportEvent()

    // 事件绑定
    this.bindEvent()

  }

  // 获取当前环境支持的事件
  getSupportEvent() {
    let supportEvents = {}
    if (typeof window.ontouchstart !== 'undefined') {
      supportEvents = {
        startEvent: 'touchstart',
        moveEvent: 'touchmove',
        endEvent: 'touchend'
      }
    } else if (typeof window.onmspointerdown !== 'undefined') { // for IE
      supportEvents = {
        startEvent: 'MSPointerDown',
        moveEvent: 'MSPointerMove',
        endEvent: 'MSPointerUp'
      }
    } else {
      supportEvents = {
        startEvent: 'mousedown',
        moveEvent: 'mousemove',
        endEvent: 'mouseup'
      }
    }
    return supportEvents
  }

  // touch事件绑定
  bindEvent() {
    let {ele, supportEvents} = this
    let {startEvent, moveEvent, endEvent} = supportEvents

    // ele.setAttribute('isAddTouchEvent', 'true')
    ele.addEventListener(startEvent, this.eventStart.bind(this), false)
    ele.addEventListener(moveEvent, this.eventMove.bind(this), false)
    ele.addEventListener(endEvent, this.eventEnd.bind(this), false)
  }

  // 事件开始时的处理
  eventStart(e) {
    // 记录事件吃否开始
    this.isEventStart = true

    // 记录是否需要阻止默认事件
    this.isStopPrevent = false

    // 记录起始运动方向
    this.startDirection = ''

    let {x, y} = this.getOrdinate(e)
    let now = Date.now()

    this.startInfo = {
      // 记录开始时间
      startTime: now,
      // 记录起点坐标
      startX: x,
      startY: y
    }

    this.moveInfo = {
      // 记录开始时间
      moveTime: now,
      // 记录起点坐标
      moveX: x,
      moveY: y,
      differX: 0,
      differY: 0,
      differTime: 0,
      direction: '',
      directionNum: 0
    }

    this.maxInfo = {
      maxX: 0,
      maxY: 0
    }

    this.lastInfo = {
      // 记录开始时间
      lastTime: now,
      // 记录起点坐标
      lastX: x,
      lastY: y,
      lastDifferX: 0,
      lastDifferY: 0,
      lastDirection: '',
      lastDirectionNum: 0
    }

    if (typeof this.start === 'function') {
      this.start(e)
    }
  }

  // 记录元素起始位置
  setStartPosition(left, top) {
    this.position = {
      left,
      top
    }
  }

  // 事件移动中的处理
  eventMove(e) {
    if (this.isEventStart) {
      let {disTime, startDirection, startInfo, maxInfo, lastInfo} = this
      let now = Date.now()
      // 获取当前坐标
      let {x, y} = this.getOrdinate(e)

      let {lastTime, lastX, lastY} = lastInfo
      let {startX, startY, startTime} = startInfo

      let differX = x - startX
      let differY = y - startY
      let differTime = now - startTime

      let lastDifferX = x - lastX
      let lastDifferY = y - lastY

      let {direction, directionNum} = this.getDirection(differX, differY)
      let {
        direction: lastDirection,
        directionNum: lastDirectionNum
      } = this.getDirection(lastDifferX, lastDifferY)

      // 记录当前坐标信息
      this.moveInfo = {
        moveX: x,
        moveY: y,
        moveTime: now,
        differX,
        differY,
        differTime,
        direction,
        directionNum
      }

      // 记录最后300毫秒内的坐标，用作统计最后一段距离的速度及方向
      if (now - lastTime > disTime) {
        this.lastInfo = {
          lastTime: now,
          lastX: x,
          lastY: y,
          lastDifferX: lastDifferX,
          lastDifferY: lastDifferY,
          lastDirection,
          lastDirectionNum
        }
      }


      this.setMaxInfo(differX, differY)

      if (startDirection === '' && direction !== '') {
        this.startDirection = direction
      }

      // 判断是否需要阻止默认事件
      this.stopPrevent(e)

      if (typeof this.move === 'function') {
        this.move(e)
      }

    }
  }

  setMaxInfo(differX, differY){
    let {maxInfo} = this
    let {maxX, maxY} = maxInfo
    // 记录运动过程最大位移量
    maxX = Math.abs(differX) > Math.abs(maxX)
      ? differX
      : maxX
    maxY = Math.abs(differY) > Math.abs(maxY)
      ? differY
      : maxY
    this.maxInfo = {
      maxX,
      maxY
    }
  }

  // 获取最后时间运动信息
  getCurrentInfo(){
    let {
      disTime,
      moveInfo,
      lastInfo
    } = this
    let {
      moveTime,
      moveX,
      moveY,
      differX,
      differY,
    } = moveInfo

    let {
      lastTime,
      lastX,
      lastY,
      lastDirection,
      lastDirectionNum
    } = lastInfo


    if(moveTime - lastTime > disTime/10){
      let lastDifferX = moveX - lastX
      let lastDifferY = moveY - lastY
      let {direction, directionNum} = this.getDirection(lastDifferX, lastDifferY)
      return {
        differX,
        differY,
        direction
      }
    }else{
      return {
        differX,
        differY,
        direction: lastDirection
      }
    }
  }

  // 记录起始和停止后的运动方向
  // differX  水平位移
  // differY  垂直位移
  // min  最小运动临界值值，小于这个值则认为未运动
  getDirection(differX, differY) {
    let {minNum, startDirection} = this
    let absDifferX = Math.abs(differX)
    let absDifferY = Math.abs(differY)
    let direction = ''
    let directionNum = 0

    minNum = startDirection !== ''
      ? 1
      : minNum

    if (absDifferX > minNum || absDifferY > minNum) {
      if (absDifferX > absDifferY) {
        direction = 'h'
        directionNum = differX
      } else {
        direction = 'v'
        directionNum = differY
      }
    }
    return {direction, directionNum}
  }

  // dragDirection  需要拖拽元素的方向（x,y,all,'')
  getPosition(dragDirection = 'y') {
    let {position} = this
    let {left, top} = position
    let {direction, differNum, differX, differY} = this.moveInfo
    if (direction === 'h') {
      left = left + differNum
    }
    if (direction === 'v') {
      top = top + differNum
    }
    // left = left + differX
    // top = top + differY
    return {left, top}
  }

  // 起始运动方向与需要阻止默认事件的方向一致，则阻止默认事件
  stopPrevent(e) {
    let {isStopPrevent, startDirection} = this

    if (!isStopPrevent && startDirection !== '') {
      e.preventDefault()
      this.isStopPrevent = true
    }
  }

  // 事件结束时的处理
  eventEnd() {
    this.isEventStart = false
    if (typeof this.end === 'function') {
      // 是否有移动
      this.end()
    }
  }

  // 获取事件对象坐标
  getOrdinate(e) {
    if (e.touches) {
      return {x: e.touches[0].pageX, y: e.touches[0].pageY}
    } else {
      return {x: e.clientX, y: e.clientY}
    }
  }

}
