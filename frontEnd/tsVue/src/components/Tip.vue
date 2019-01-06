<template>
  <p>tip--{{message}}--{{o2}}</p>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Prop(String) message !: string
  get o2() {
    let { message } = this;
    return `${message}-from o2`
  }
}
</script>