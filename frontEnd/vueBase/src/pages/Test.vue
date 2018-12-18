<template>
<div>
{{list}}
</div>
</template>

<script>


const list = [
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "3个月", deadline: 3, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "10%", value: "0.100000" }
  },
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "12个月", deadline: 12, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "15%", value: "0.150000" }
  },
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "18个月", deadline: 18, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "20%", value: "0.200000" }
  },
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "24个月", deadline: 24, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "24%", value: "0.240000" }
  },
  {
    productType: { name: "信用卡贷", value: 2 },
    periodType: { name: "3个月", deadline: 3, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "10%", value: "0.100000" }
  },
  {
    productType: { name: "信用卡贷", value: 2 },
    periodType: { name: "6个月", deadline: 6, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "12%", value: "0.120000" }
  },
  {
    productType: { name: "信用卡贷", value: 2 },
    periodType: { name: "12个月", deadline: 12, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "15%", value: "0.150000" }
  },
  {
    productType: { name: "信用卡贷", value: 2 },
    periodType: { name: "18个月", deadline: 18, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "20%", value: "0.200000" }
  },
  {
    productType: { name: "房抵贷", value: 3 },
    periodType: { name: "3个月", deadline: 3, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "11%", value: "0.110000" }
  },
  {
    productType: { name: "房抵贷", value: 3 },
    periodType: { name: "6个月", deadline: 6, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "12%", value: "0.120000" }
  },
  {
    productType: { name: "房抵贷", value: 3 },
    periodType: { name: "12个月", deadline: 12, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "15%", value: "0.150000" }
  },
  {
    productType: { name: "房抵贷", value: 3 },
    periodType: { name: "18个月", deadline: 18, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "20%", value: "0.200000" }
  },
  {
    productType: { name: "消费贷", value: 10 },
    periodType: { name: "6个月", deadline: 6, deadlineUnit: 1 },
    repaymentType: { name: "到期还本付息", value: 1 },
    rateType: { name: "15%", value: "0.150000" }
  },
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "3个月", deadline: 3, deadlineUnit: 1 },
    repaymentType: { name: "到期还本付息", value: 1 },
    rateType: { name: "10%", value: "0.100000" }
  },
  {
    productType: { name: "社保贷", value: 1 },
    periodType: { name: "9个月", deadline: 9, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "13%", value: "0.130000" }
  },
  {
    productType: { name: "房抵贷", value: 3 },
    periodType: { name: "90天", deadline: 90, deadlineUnit: 2 },
    repaymentType: { name: "到期还本付息", value: 1 },
    rateType: { name: "15%", value: "0.150000" }
  },
  {
    productType: { name: "极速贷", value: 6 },
    periodType: { name: "6个月", deadline: 6, deadlineUnit: 1 },
    repaymentType: { name: "到期还本付息", value: 1 },
    rateType: { name: "22%", value: "0.220000" }
  },
  {
    productType: { name: "极速贷", value: 6 },
    periodType: { name: "9个月", deadline: 9, deadlineUnit: 1 },
    repaymentType: { name: "等额本息", value: 2 },
    rateType: { name: "13%", value: "0.130000" }
  },
  {
    productType: { name: "其他", value: 9 },
    periodType: { name: "1个月", deadline: 1, deadlineUnit: 1 },
    repaymentType: { name: "到期还本付息", value: 1 },
    rateType: { name: "1%", value: "0.010000" }
  }
]

export default {
  data(){
    return {
      list: [],
      condit: {
        productType: [1]
      },
      keys: ['productType', 'periodType', 'repaymentType', 'rateType']
    }
  },
  mounted(){
    this.list = list
    let {keys, condit} = this
    let result = {}
    keys.forEach((key, keyIndex) => {
      result[key] = list.filter(listItem=>{
        let isShow = false
        let findNum = 0
        for( let i = 0; i < keyIndex; i++){
          let subKey = keys[i]
          let currentConditArr = condit[subKey] || []
          if(!currentConditArr){
            condit[subKey] = []
            currentConditArr = []
          }
          if(currentConditArr.length > 0 ){
            let hadOne = currentConditArr.some(conditItem=>{
              if( subKey === 'periodType'){
                let {deadline: conditDeadline, deadlineUnit: conditDeadlineUnit} = conditItem
                let {deadline, deadlineUnit} = listItem[subKey]
                return conditDeadline == deadline && conditDeadlineUnit == deadlineUnit 
              }
              return parseFloat(conditItem) == parseFloat(listItem[subKey]['value'])
            })

            if(hadOne){
              findNum++
            }
          }else{
            findNum++
          }
          if(findNum > 0 && findNum === keyIndex - 1){
            isShow = true
          }
          if(!(result[key])){
            result[key] = []
          }
          if(!(result[key].some(({name})=> name === listItem[key].name))){
            return true
          }else{
            return false
          }
        }


      })


    })
    console.log('result: ', result)
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
