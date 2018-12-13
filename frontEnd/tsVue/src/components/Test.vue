<template>
  <div class="demo">
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
  </div>
</template>

<script lang="ts">
// https://www.jianshu.com/p/78dda0c32d0c
import Vue from 'vue'
import { Getter, Mutation } from 'vuex-class'

export default class Index extends Vue {
  //Getter
  @Getter author;//作者

  //Mutation
  @Mutation SET_AUTHOR;
  
  mounted(){
    console.log(this.author);
    this.changeAuthor('帅锅');
  }

  changeAuthor(name) {
    this.SET_AUTHOR(name);
  }
}

</script>
<style scoped>
.demo{
  color:red;
}
</style>