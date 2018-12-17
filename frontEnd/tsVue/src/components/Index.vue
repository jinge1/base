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
import Vue from 'vue'
import Component from 'vue-class-component'
import {State, Action, Mutation, Getter} from 'vuex-class'


@Component
export default class Counter extends Vue {
    @State count: number
    @Getter msg: string
    @Mutation('ADD_NUM') addNum: void 
    @Action('ADD_NUM') mAddNum: void 
    
    created() {
       console.log('ok?')
    }

}
</script>
<style scoped>
.test2{
  display:flex;
  span{
    flex:1;
  }
  button{
    width:3rem;
    line-height:3em;
    background:orange;
    color:#fff;
  }
}
</style>
