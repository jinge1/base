<template>
  <div class="demo">
    <p @click="add">index, clickNum: {{num}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class App extends Vue {
    // 初始化数据
    num:number = 0

    // 声明周期钩子
    mounted () {

    }

    // 方法
    add () {
      let {num} = this
      this.num = num + 1
    }
  }
</script>
<style scoped>
.demo{
  color:red;
}
</style>