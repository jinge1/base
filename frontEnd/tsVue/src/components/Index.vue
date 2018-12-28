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

function splitArr(arr: any[], splitNum: number) {
  return arr.reduce((pre, next, index) => {
    let parentIndex = Math.floor(index / splitNum)
    if (typeof pre[parentIndex] === 'undefined') {
      pre[parentIndex] = []
    }
    pre[parentIndex].push(next)
    return pre
  }, []);
}

function ajax(item: number[]) {
  return new Promise((resolve, rejext) => {
    setTimeout(() => {
      resolve(`ajax ${item}`)
    }, 1000)
  })
}

function toFetch(arr: any[], index = 0) {
  if (index < arr.length) {
    ajax(arr[index]).then(res => {
      console.log(res)
      toFetch(arr, index + 1)
    })
  } else {
    console.log('over !')
  }
}

let arr = [1, 2, 3, 4, 5, 6, 7]
let sArr = splitArr(arr, 3)

toFetch(sArr)


// console.log(sArr);

@Component
export default class Counter extends Vue {
  @State count: number;
  @Getter msg: string;
  @Mutation("ADD_NUM") addNum: void;
  @Action("ADD_NUM") mAddNum: void;
  created() {
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
