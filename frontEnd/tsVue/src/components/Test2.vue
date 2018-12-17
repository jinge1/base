<template>
  <div @click="addNum">
    {{num}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import {mapActions, mapMutations} from 'vuex'
import Component from 'vue-class-component'
import {State, Action, Mutation} from 'vuex-class'


@Component
export default class Counter extends Vue {
    @State num: number;
    @Mutation('ADD_NUM') addNum: void 
    // @State('num') num
    // @Getter count: number;
    // @Action('app/name') name: any;
    
    created() {
       console.log('ok?')
    }

}
</script>
<style scoped>
.demo{
  color:red;
}
</style>
