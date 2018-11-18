<template>
<div class="game">
  <ul class="roles-list" id="roles" :class="{trans: isTrans}">
    <li v-for="(item, index) in renderList" :class="[`roles-${item.role}`]" :data-index="index" :style="{ width: `${item.width}px`, height: `${item.height}px`, left: `${item.left}px`, top: `${item.top}px`}">
      {{item.name}}
    </li>
  </ul>
</div>
</template>
<script>
import VSwipe from '../utils/VSwipe'
import Huarongdao from '../utils/Huarongdao'

export default {
  data() {
    return {
      roles: [{ // 类型，0: 空格
          role: 0,
          name: '',
          hSize: 1,
          vSize: 1
        },
        {
          role: 1, // 类型，1: 自融,2: 假标,3: 自担保,4: 投资人,5: 风控弱,6: 拆标,7: 资金池
          name: '自融', // 类型名称
          hSize: 2, // 横向占用空间大小
          vSize: 1 // 纵向占用空间大小 // 空间排列方向 1：横向，2：纵向
        },
        {
          role: 2,
          name: '假标',
          hSize: 1,
          vSize: 1
        },
        {
          role: 3,
          name: '自担保',
          hSize: 1,
          vSize: 2
        },
        {
          role: 4,
          name: '投资人',
          hSize: 2,
          vSize: 2
        },
        {
          role: 5,
          name: '风控弱',
          hSize: 1,
          vSize: 2
        },
        {
          role: 6,
          name: '拆标',
          hSize: 1,
          vSize: 2
        },
        {
          role: 7,
          name: '资金池',
          hSize: 1,
          vSize: 2
        }
      ],
      layout: [ // 类型 1: 自融,2: 假标,3: 自担保,4: 投资人,5: 风控弱,6: 拆标,7: 资金池
        {
          role: 1,
          x: 0,
          y: 0
        },
        // {
        //   role: 2,
        //   x: 2,
        //   y: 0
        // },
        // {
        //   role: 2,
        //   x: 3,
        //   y: 0
        // },

        {
          role: 3,
          x: 0,
          y: 1
        },
        {
          role: 4,
          x: 1,
          y: 1
        },

        // {
        //   role: 5,
        //   x: 0,
        //   y: 3
        // },
        {
          role: 6,
          x: 2,
          y: 3
        },
        {
          role: 7,
          x: 3,
          y: 3
        }
      ],
      renderList: [],
      spaceScale: 0.02,
      rolesWidth: 0,
      spaceWidth: 0,
      halfWidth: 0,
      eachWidth: 0,
      swipe: null,
      huarongdao: null,
      isTrans: true,
      sensitivity: 6, // 灵敏度，超过这个距离才算滑动了
      moveNum: 0,
    }
  },
  mounted() {
    let {
      roles,
      layout,
      spaceScale
    } = this
    this.$nextTick(() => {
      let huarongdao = new Huarongdao({
        roles,
        layout,
        hSize: 4,
        vSize: 5,
        spaceScale,
        ele: '#roles'
      })
      let {renderList} = huarongdao
      this.huarongdao = huarongdao
      this.renderList = renderList
      this.setSwipe()
    })

  },
  methods: {
    setSwipe() {
      let {
        sensitivity,
        huarongdao
      } = this
      let _this = this
      let lockingDirection = 0 // 锁定滑动方向,0未锁定，1锁定水平方向，2锁定垂直方向
      let index = -1
      let endX = -1
      let endY = -1

      this.swipe = new VSwipe('#roles', 'all')
      this.swipe.start = (e) => {
        this.isTrans = false
        lockingDirection = 0
        let targetIndex = e.target.dataset.index
        endX = -1
        endY = -1
        if(typeof targetIndex !== 'undefined'){
          index = parseInt(targetIndex)
          huarongdao.setIndex(index)
        }else{
          index = -1
        }
      }
      this.swipe.move = function(e) {
        if(index === -1){
          return false
        }
        let {
          leftNum,
          rightNum,
          topNum,
          bottomNum,
          minH,
          maxH,
          minV,
          maxV,
          left,
          top
        } = huarongdao.cachePosition
        let {
          differX,
          differY
        } = this.eventData.moveInfo
        let absX = Math.abs(differX)
        let absY = Math.abs(differY)

        if (lockingDirection === 0) {
          if (absX > sensitivity || absY > sensitivity) {
            if (absX > absY) {
              lockingDirection = 1
            } else {
              lockingDirection = 2
            }
          }
        }else{
          if(lockingDirection === 1 && (leftNum > 0 || rightNum > 0)){
            let targetX = left +  differX
            if( targetX < minH ){
              targetX = minH
            }
            if( targetX > maxH ){
              targetX = maxH
            }
            _this.renderList[index].left = targetX
            let {x: preX} = huarongdao.getPosition(targetX, top)
            endX = preX
          }
          if(lockingDirection === 2 && (topNum > 0 || bottomNum > 0)){
            let targetY = top +  differY
            if( targetY < minV ){
              targetY = minV
            }
            if( targetY > maxV ){
              targetY = maxV
            }
            _this.renderList[index].top = targetY
            let {y: preY} = huarongdao.getPosition(left, targetY)
            endY = preY
          }
        }

        return false
      }
      this.swipe.end = () => {
        let {
          left,
          top
        } = huarongdao.cachePosition
        this.isTrans = true
        if(endX >= 0){
          this.renderList[index].x = endX
        }
        if(endY >= 0){
          this.renderList[index].y = endY
        }

        huarongdao.getRenderList(this.renderList)
        let {renderList} = huarongdao
        this.renderList = renderList
      }
    },
    moveRole(targetIndex, lockingDirection, distance) {
      let {
        layout,
        roles,
        emptyArr,
        spaceWidth,
        eachWidth
      } = this
      let {
        type,
        position
      } = layout[targetIndex]
      let {
        hSize,
        vSize
      } = roles[type]
      let {
        left,
        top
      } = this.getLayoutDetail(position, type)
      if (type !== 0) { // 排除空元素
        if (lockingDirection === 1) {
          let leftNum = 0 // 可左侧位移单位数
          let rightNum = 0 // 可右侧位移单位数

          // 左侧等高度空数据
          let leftEmptyArr = emptyArr.filter(({
            position: leftEmptyPosition
          }) => {
            return leftEmptyPosition[0] < position[0] && leftEmptyPosition[1] >= position[1] && leftEmptyPosition[1] < position[1] + vSize
          })
          let leftLen = Math.floor(leftEmptyArr.length / vSize) // 最大可能组合个数
          for (let m = 0; m < leftLen; m++) {
            let leftHasNum = 0
            for (let n = 0; n < vSize; n++) {
              let isRightSubHad = leftEmptyArr.some(({
                position: leftTeamEmptyPosition
              }) => {
                return leftTeamEmptyPosition[0] === position[0] - leftNum - 1 && leftTeamEmptyPosition[1] === position[1] + n
              })
              if (isRightSubHad) {
                leftHasNum = leftHasNum + 1
              }
            }
            if (leftHasNum === vSize) {
              leftNum = leftNum + 1
            } else {
              break
            }
          }

          let rightEmptyArr = emptyArr.filter(({
            position: rightEmptyPosition
          }) => {
            return rightEmptyPosition[0] >= position[0] + hSize && rightEmptyPosition[1] >= position[1] && rightEmptyPosition[1] < position[1] + vSize
          })
          let rightLen = Math.floor(rightEmptyArr.length / vSize)
          for (let i = 0; i < rightLen; i++) {
            let rightHasNum = 0
            for (let j = 0; j < vSize; j++) {
              let isLeftSubHad = rightEmptyArr.some(({
                position: rightTeamEmptyPosition
              }) => {
                return rightTeamEmptyPosition[0] === position[0] + hSize + rightNum && rightTeamEmptyPosition[1] === position[1] + j
              })
              if (isLeftSubHad) {
                rightHasNum = rightHasNum + 1
              }
            }
            if (rightHasNum === vSize) {
              rightNum = rightNum + 1
            } else {
              break
            }
          }

          if (leftNum > 0 || rightNum > 0) {
            let targetLeft = left + distance
            let minLeft = left - leftNum * (eachWidth + spaceWidth)
            let maxLeft = left + rightNum * (eachWidth + spaceWidth)
            if (targetLeft < minLeft) {
              targetLeft = minLeft
            }
            if (targetLeft > maxLeft) {
              targetLeft = maxLeft
            }

            this.layoutList[targetIndex].top = top
            this.layoutList[targetIndex].left = targetLeft
            let moveNum = Math.round(Math.abs((targetLeft - left) / (eachWidth + spaceWidth)))
            this.moveNum = targetLeft - left > 0 ? moveNum : -moveNum
          }

        }

        if (lockingDirection === 2) {
          let topNum = 0 // 可左侧位移单位数
          let bottomNum = 0 // 可右侧位移单位数

          // 左侧等高度空数据
          let topEmptyArr = emptyArr.filter(({
            position: topEmptyPosition
          }) => {
            return topEmptyPosition[1] < position[1] && topEmptyPosition[0] >= position[0] && topEmptyPosition[0] < position[0] + hSize
          })
          let topLen = Math.floor(topEmptyArr.length / hSize) // 最大可能组合个数
          for (let m = 0; m < topLen; m++) {
            let topHasNum = 0
            for (let n = 0; n < hSize; n++) {
              let isTopSubHad = topEmptyArr.some(({
                position: topTeamEmptyPosition
              }) => {
                return topTeamEmptyPosition[1] === position[1] - topNum - 1 && topTeamEmptyPosition[0] === position[0] + n
              })
              if (isTopSubHad) {
                topHasNum = topHasNum + 1
              }
            }
            if (topHasNum === hSize) {
              topNum = topNum + 1
            } else {
              break
            }
          }

          let bottomEmptyArr = emptyArr.filter(({
            position: bottomEmptyPosition
          }) => {
            return bottomEmptyPosition[1] >= position[1] + hSize && bottomEmptyPosition[0] >= position[0] && bottomEmptyPosition[0] < position[0] + hSize
          })
          let bottomLen = Math.floor(bottomEmptyArr.length / hSize)
          for (let i = 0; i < bottomLen; i++) {
            let bottomHasNum = 0
            for (let j = 0; j < hSize; j++) {
              let isTopSubHad = bottomEmptyArr.some(({
                position: bottomTeamEmptyPosition
              }) => {
                // return true
                console.log('bottomTeamEmptyPosition: ', bottomTeamEmptyPosition[1])
                console.log('bottomTeamEmptyPosition: ', position[1] + vSize)
                // console.log('bottomTeamEmptyPosition: ', bottomTeamEmptyPosition)
                return bottomTeamEmptyPosition[1] === position[1] + vSize + i && bottomTeamEmptyPosition[0] === position[0] + j
              })

              if (isTopSubHad) {
                bottomHasNum = bottomHasNum + 1
              }

              // console.log('isTopSubHad: ', isTopSubHad)
              // console.log('bottomHasNum: ', bottomHasNum)
            }

            if (bottomHasNum === hSize) {
              bottomNum = bottomNum + 1
            } else {
              break
            }

          }


          if (topNum > 0 || bottomNum > 0) {
            let targetTop = top + distance
            let minTop = top - topNum * (eachWidth + spaceWidth)
            let maxTop = top + bottomNum * (eachWidth + spaceWidth)
            if (targetTop < minTop) {
              targetTop = minTop
            }
            if (targetTop > maxTop) {
              targetTop = maxTop
            }

            this.layoutList[targetIndex].left = left
            this.layoutList[targetIndex].top = targetTop
            let moveNum = Math.round(Math.abs((targetTop - top) / (eachWidth + spaceWidth)))
            this.moveNum = targetTop - top > 0 ? moveNum : -moveNum
          }
        }
      }
    }
  },
  computed: {
    emptyArr() {
      let {
        roles,
        layout
      } = this
      let emptyLayout = layout.filter(({
        type
      }) => type === 0)
      let result = []
      emptyLayout.forEach(({
        type,
        position
      }) => {
        result.push({
          ...roles[type],
          position
        })
      })
      return result
    }
  }

}
</script>
<style scoped>
body,
ul,
li,
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.game {
  text-align: center;
}

.roles-list {
  position: relative;
  width: 100%;

  li {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    color: #fff;
    border-radius: .1rem;

    /* 1: 自融,2: 假标,3: 自担保,4: 投资人,5: 风控弱,6: 拆标,7: 资金池 */
    &.roles-0 {
      box-shadow: 0 0 .05rem #ccc;
      z-index: 3;
    }

    &.roles-1 {
      background: green;
    }

    &.roles-2 {
      background: red;
    }

    &.roles-3 {
      background: yellow;
    }

    &.roles-4 {
      background: blue;
    }

    &.roles-5 {
      background: gray;
    }

    &.roles-6 {
      background: #996633;
    }

    &.roles-7 {
      background: #660099;
    }

  }
}

.trans {
  li {
    transition: all .1s ease;
  }
}
</style>
