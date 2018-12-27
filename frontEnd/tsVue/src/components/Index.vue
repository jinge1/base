<template>
  <div>
    <div class="test2">
      <button @click="mAddNum(-3)">a add</button>
      <span>{{count}}</span>
      <button @click="addNum(2)">m add</button>
    </div>
    <p>{{msg}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Mutation, Getter } from "vuex-class";

interface O {
  name: string,
  age: number,
  other: {
    thirdname: string
  },
  arr: number[]
}

function deepCopy (obj: any): any {
  let result: any = Array.isArray(obj) ? [] : {}
  if (Array.isArray(obj)) {
    console.log(`1`)
    return obj.reduce((pre, current) => {
      pre.push(deepCopy(current))
    }, [])
  } else if (typeof obj === 'object') {
    console.log(`2`)
    return Object.keys(obj).reduce((pre: any, current: any) => {
      console.log(`${current} -- ${obj[current]}`)
      pre[current] = deepCopy(obj[current])
      console.log(pre)
    }, {})
  } else {
    console.log(`3`)
    return obj
  }
  
}

let o: O = {
  name: 'lixiong',
  age: 18,
  other: {
    thirdname: 'third'
  },
  arr: [3,2,1]
}
let o2 = deepCopy(o)
o2.arr[2] = 100
console.log(o)

@Component
export default class Counter extends Vue {
  @State count: number;
  @Getter msg: string;
  @Mutation("ADD_NUM") addNum: void;
  @Action("ADD_NUM") mAddNum: void;
  created () {
    console.log("ok?");
  }
}
</script>
<style lang="postcss" scoped>
.test2 {
  display: flex;
  span {
    flex: 1;
  }
  button {
    width: 3rem;
    line-height: 3em;
    background: orange;
    color: #fff;
  }
}
</style>
