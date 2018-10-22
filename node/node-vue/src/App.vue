<template>
<div id="app">
  <h1>vue-ssr</h1>
  <router-link class="link" to="/home">to Home</router-link>
  <router-link class="link" to="/about">to About</router-link>

  <router-view class="view"></router-view>
</div>
</template>

<style>
.link {
  margin: 10px;
}
</style>
