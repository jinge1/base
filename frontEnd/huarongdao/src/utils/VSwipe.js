
// 请求基类，可根据实际需要进行扩展
export default class TouchEvent {
  // element  绑定touch事件的元素
  // dragDirection  需要拖拽元素的方向（x,y,all,'')
  constructor(element, dragDirection = 'y') {

    // 绑定事件元素
    this.ele = typeof element === 'string' ? document.querySelector(element) : element

    this.dragDirection = dragDirection

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
    this.isEventStart = true
    let {x, y} = this.getOrdinate(e)
    let now = Date.now()

    this.eventData = {
      // 计算起始运动方向
      startDirection: '',

      // 计算结束后的运动方向
      endDirection: '',

      startInfo: {
        // 记录开始时间
        startTime: now,

        // 记录起点坐标
        startX: x,
        startY: y
      },

      moveInfo: {
        moveTime: now,
        // 记录移动中的坐标
        moveX: x,
        moveY: y,

        // 运动中水平垂直位移量
        differX: 0,
        differY: 0,

        // 运动过程中的最大移动距离(为绝对值)
        maxDistanceX: 0,
        maxDistanceY: 0
      },

      lastInfo: {
        // 最后一段距离的坐标，每隔300毫秒更新一次
        lastTimeX: x,
        lastTimeY: y,
        lastTime: now
      }
    }

    if (typeof this.start === 'function') {
      this.start(e)
    }
  }

  // 事件移动中的处理
  eventMove(e) {
    if (this.isEventStart) {
      let now = Date.now()
      let {startInfo, lastInfo, moveInfo, startDirection} = this.eventData
      let {startX, startY} = startInfo
      let {maxDistanceX, maxDistanceY} = moveInfo
      let {lastTime} = lastInfo

      // 获取当前坐标
      let {x, y} = this.getOrdinate(e)

      // 运动偏移信息
      let differX = x - startX
      let differY = y - startY
      maxDistanceX = Math.max(maxDistanceX, Math.abs(differX))
      maxDistanceY = Math.max(maxDistanceY, Math.abs(differY))

      // 记录最后300毫秒内的坐标，用作统计最后一段距离的速度
      if (now - lastTime > 300) {
        this.eventData.lastInfo = {
          lastTimeX: x,
          lastTimeY: y,
          lastTime: now
        }
      }

      // 记录运动过程中的信息
      this.eventData.moveInfo = {
        moveTime: now,
        moveX: x,
        moveY: y,
        differX,
        differY,
        maxDistanceX,
        maxDistanceY
      }

      // 记录运动结束后的运动方向
      this.eventData.endDirection = this.getDirection(differX, differY)

      if (startDirection === '') {
        // 记录起始运动方向，避免重复统计
        let sDirection = this.getDirection(differX, differY, 7)
        if (sDirection !== '') {
          this.eventData.startDirection = sDirection
          this.stopPrevent(e)
        }
      } else {
        this.stopPrevent(e)
      }

      if (typeof this.move === 'function') {
        this.move(e)
      }

    }
  }

  // 记录起始和停止后的运动方向
  // differX  水平位移
  // differY  垂直位移
  // minNum  最小运动临界值值，小于这个值则认为未运动
  getDirection(differX, differY, minNum = 60) {
    let absDifferX = Math.abs(differX)
    let absDifferY = Math.abs(differY)
    let direction = ''
    if (absDifferX > minNum || absDifferY > minNum) {
      if (absDifferX > absDifferY) {
        direction = differX > 0
          ? 'right'
          : 'left'
      } else {
        direction = differY > 0
          ? 'down'
          : 'up'
      }
    }
    return direction
  }

  // 起始运动方向与需要阻止默认事件的方向一致，则阻止默认事件
  stopPrevent(e) {
    let startDirection = this.eventData.startDirection
    let dragDirection = this.dragDirection
    if (dragDirection === 'all') {
      e.preventDefault()
    } else {
      if (dragDirection === 'x' && (startDirection === 'left' || startDirection === 'right')) {
        e.preventDefault()
      }
      if (dragDirection === 'y' && (startDirection === 'up' || startDirection === 'down')) {
        e.preventDefault()
      }
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
