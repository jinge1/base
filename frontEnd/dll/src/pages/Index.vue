<template>
<div class="demo">
  <h1>demo</h1>
  <div class="test">
    This is demo page!
  </div>
  <p>
    {{msg}}
  </p>
  <Loading></Loading>
</div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  components:{
    Loading
  },
  data(){
    return {
      msg: 'msg from data'
    }
  },
  mounted(){
    setTimeout(()=>{
      this.msg = 'msg is changed'
    },2000)

    console.log('It is ok!')
    function pro(){
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve('It is done!')
        }, 3000)
      })
    }

    async function asy(){
      let a = await pro()
      console.log(a)
    }

    asy()



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
