import greeter from './utils/greeter'


function pro(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve('It is done!')
    }, 3000)
  })
}
//
async function asy(){
  let a = await pro()
  console.log(a)
}
//
asy()

console.log(greeter('string2'))
