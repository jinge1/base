<template>
<div>
  <h1>Home</h1>
  <p>{{ homeInfo }}</p>
</div>
</template>
<script>
export default {
  serverRequest(store) {
    return store.dispatch('getHomeInfo')
  },
  mounted() {

  },
  computed: {
    homeInfo() {
      return this.$store.state.homeInfo
    }
  }
}
</script>
