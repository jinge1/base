<template>
  <div class="demo">
    <input v-model="msg">
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
    <Tip></Tip>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Tip from './Tip.vue'

  @Component({
    components: {
      Tip
    },
  })
  export default class App extends Vue {
    
    // 初始化数据
    msg = 123

    // 声明周期钩子
    mounted () {
      // this.greet()
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    greet () {
      console.log('greeting: ' + this.msg)
    }
  }
</script>
<style scoped>
.demo{
  color:red;
}
</style>
