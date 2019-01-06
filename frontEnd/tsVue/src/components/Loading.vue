<template>
  <div class="loading" v-if="isShow">
    <span>loading</span>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import VueMixin from "../utils/VueMixin";
@Component({
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
})
export default class Counter extends mixins(VueMixin) {}
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