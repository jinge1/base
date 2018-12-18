<template>
  <div>
    <div class="section">
      <h1>321</h1>
      <ul>
        <li>1</li>
      </ul>
    </div>
    {{list}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

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

@Component
export default class App extends Vue {
  list: object[] = [];

  condit: object[] = [];

  typesArr:string[] = ['productType', 'periodType', 'repaymentType', 'rateType']

  // 声明周期钩子
  mounted() {
    this.list = [...list]
    let {typesArr, condit} = this

    typesArr.forEach((type: string) => {
      if(!(condit[type])){

      }
    })
  }
}
</script>
<style scoped>
.demo {
  color: red;
}
</style>
