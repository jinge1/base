<template>
  <div>
    <div class="test2">
      <button @click="mAddNum(-3)">a add</button>
      <span>{{count}}--{{mixinValue}}</span>
      <button @click="addNum(2)">m add</button>
    </div>
    <p @click="testFn">{{msg}}</p>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import { State, Action, Mutation, Getter } from "vuex-class";
import VueMixin from "../utils/VueMixin"





// console.log(sArr);

@Component
export default class Counter extends mixins(VueMixin) {
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
