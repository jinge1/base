<template>
<div class="game">
  <ul class="roles-list" id="roles" :class="{trans: isTrans}" :style="{height: `${totalHeight}px`}">
    <li v-for="(item, index) in renderList" :class="[`roles-${item.role}`]" :data-index="index" :style="{ width: `${item.width}px`, height: `${item.height}px`, left: `${item.left}px`, top: `${item.top}px`}">
      {{item.name}}
    </li>
  </ul>
</div>
</template>
<script>
import VSwipe from '../utils/VSwipe2'
import Huarongdao from '../utils/Huarongdao3'

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
        // {
        //   role: 4,
        //   x: 1,
        //   y: 1
        // },

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
      totalHeight: 0,
      swipe: null,
      huarongdao: null,
      isTrans: false,
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
      let huarongdao = new Huarongdao({
        ele,
        roles,
        layout,
        datasetKey: 'index',
        hSize: 4,
        vSize: 5,
        spaceScale
      })
      huarongdao.startEvent = (e)=>{
        this.isTrans = false
      }
      huarongdao.update = ()=>{
        this.setLayout()
      }
      huarongdao.beforeEnd = ()=>{
        this.isTrans = true
      }

      huarongdao.endEvent = ()=>{
        this.setLayout()
      }

      let {totalHeight, renderList} = huarongdao
      this.totalHeight = totalHeight
      this.huarongdao = huarongdao
      this.setLayout()
    })

  },
  methods: {
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
