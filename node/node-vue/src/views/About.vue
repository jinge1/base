<template>
<div>
  <h1>About</h1>
  <p>{{ aboutInfo }}</p>
</div>
</template>
<script>
export default {
  serverRequest(store) {
    return store.dispatch('getAboutInfo')
  },
  mounted() {

  },
  computed: {
    aboutInfo() {
      return this.$store.state.aboutInfo
    }
  }
}
</script>
