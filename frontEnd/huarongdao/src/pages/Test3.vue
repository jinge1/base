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
import VSwipe from '../utils/VSwipe2'
import Huarongdao from '../utils/Huarongdao2'


export default {
  data() {
    return {
      roles: [{
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
        {
          role: 2,
          x: 3,
          y: 0
        },

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
      swipe: null,
      huarongdao: null,
      isTrans: true,
      indexRole: -1
    }
  },
  mounted() {
    let {
      roles,
      layout,
      spaceScale
    } = this
    this.$nextTick(() => {
      let ele = document.querySelector('#roles')
      let width = parseInt(document.defaultView.getComputedStyle(ele, null).width)
      let huarongdao = new Huarongdao({
        roles,
        hSize: 4,
        vSize: 5,
        spaceScale,
        width
      })

      huarongdao.updatePosition = ()=>{
        this.setLayout()
      }
      huarongdao.setRenderList(layout)
      this.huarongdao = huarongdao
      this.setLayout()
      this.setSwipe()
    })

  },
  methods: {
    setSwipe() {
      let swipe = new VSwipe('#roles')
      let preDirection = ''
      let {
        renderList,
        huarongdao
      } = this
      swipe.start = (e) => {
        let index = e.target.dataset.index
        if (!isNaN(index)) {
          let {
            left,
            top
          } = renderList[index]
          this.isTrans = false
          this.setIndex(index)
          this.setLayout()
        } else {
          this.indexRole = -1
        }
      }
      swipe.move = (e) => {
        let {
          indexRole,
          renderList
        } = this
        if (indexRole === -1) {
          return false
        }

        let {
          differX,
          differY,
          direction
        } = swipe.getCurrentInfo()
        // console.log('direction: ', direction)
        huarongdao.setPosition(direction, differX, differY)
      }
      swipe.end = () => {
        // let {
        //   indexRole,
        //   layout
        // } = this
        // this.isTrans = true
        // let {
        //   left,
        //   top
        // } = renderList[indexRole]
        // let {
        //   x,
        //   y
        // } = huarongdao.getPosition(left, top)

        // if (endX >= 0) {
        // this.layout[indexRole].x = x
        // }
        // if (endY >= 0) {
        // this.layout[indexRole].y = y
        // }
        //
        // huarongdao.setRenderList(layout)
        // let {
        //   renderList: changeList
        // } = huarongdao
        // console.log(changeList)
        // this.renderList = changeList
      }

      this.swipe = swipe
    },
    setPosition(direction, differX, differY) {
      let {
        indexRole,
        swipe
      } = this
      let {
        left,
        top
      } = swipe.position
      let {
        maxLeft,
        maxTop
      } = swipe.getLimit(direction, differX, differY)
      if (direction === 'h') {
        this.renderList[indexRole].left = left + differX
      }
      if (direction === 'v') {
        this.renderList[indexRole].top = top + differY
      }
    },
    setIndex(index){
      let {
        swipe,
        huarongdao,
        renderList
      } = this
      let {
        left,
        top
      } = renderList[index]
      this.indexRole = index
      // swipe.setStartPosition(left, top)
      huarongdao.setRole(index)
    },
    setLayout(){
      let {
        huarongdao
      } = this
      let {
        renderList
      } = huarongdao
      this.renderList = renderList
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
  width:100%;
  height:600px;
  overflow: hidden;
}

.roles-list {
  position: relative;
  width: 100%;
  background: #ccc;

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
