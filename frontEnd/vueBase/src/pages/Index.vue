<template>
<div class="demo">
  <h1>demo</h1>
  <div class="test">
    This is demo page!
  </div>
  <p>
    {{msg}}
  </p>
</div>
</template>

<script>
import '../test.js'
export default {
  data(){
    return {
      msg: 'msg from data'
    }
  },
  mounted(){
    setTimeout(()=>{
      this.msg = 'msg is changed'
    },2000)
  }
}
</script>

<style scope>
:root{
  --col: red;
}

.demo {

  text-align: center;

  h1 {
    font-weight: normal;
  }

  .test {
    color: var(--col);
  }
}
</style>
