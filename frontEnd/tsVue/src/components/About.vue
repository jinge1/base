<template>
  <div class="demo">
    <input v-model="msg">
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
    <Tip :message="msg"></Tip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import VueMixin from "../utils/VueMixin"
import Tip from "./Tip.vue";
@Component({
  components: {
    Tip
  }
})
export default class App extends Mixins(VueMixin) {
  // 初始化数据
  msg = '123';

  // 声明周期钩子
  mounted() {
    this.testFn()
    // this.greet()
  }

  // 计算属性
  get computedMsg() {
    return "computed " + this.msg;
  }

  // 方法
  greet() {
    console.log("greeting: " + this.msg);
  }
}
</script>
<style scoped>
.demo {
  color: red;
}
</style>
