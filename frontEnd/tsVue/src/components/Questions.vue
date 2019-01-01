<template>
  <div class="questions">
    <div class="title">
      <h1>前端100题</h1>
    </div>
    <ul class="list">
      <li v-for="(item, index) in questions" :key="index">
        <h2>{{index + 1}}、{{item.title}}</h2>
        <div class="code">
          <p class="code-input">
            <span>input:</span>
            <span @click="toDo(item, index)">start</span>
          </p>
          <pre>
{{item.input}}
</pre>
        </div>
        <div class="code">
          <p class="code-input">
            <span>output:</span>
          </p>
          <pre>
{{item.output}}
</pre>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { splitArr, toFetch, deepCopy, deepAssign } from "../utils/question";

@Component
export default class Counter extends Vue {
  questions = [
    {
      title: "数组拆分",
      input: [1, 2, 3, 4, 5, 6, 7],
      output: ""
    },
    {
      title: "逐个发送请求",
      input: [[1, 2, 3], [4, 5, 6], [7]],
      output: ""
    },
    {
      title: "深拷贝对象",
      input: {
        name: "obj",
        arr: [1, 3, 5],
        info: {
          height: 200
        }
      },
      output: ""
    },
    {
      title: "深合并对象",
      input: [
        {
          name: "obj",
          arr: [1, 3, 5],
          info: {
            height: 200
          }
        },
        {
          name: "obj2",
          arr: [6, 7],
          info: {
            with: 100
          }
        }
      ],
      output: ""
    }
  ];
  toDo({ input }: { input: any }, index: number) {
    let output: any = "";
    if (index === 0) {
      output = splitArr(input, 3);
      this.questions[index].output = output;
    }
    if (index === 1) {
      output = [];
      toFetch(input, 0, msg => {
        output.push(msg);
        this.questions[index].output = output;
      });
    }
    if (index === 2) {
      output = deepCopy(input);
      this.questions[index].output = output;
    }
    if (index === 3) {
      output = deepAssign(...input);
      this.questions[index].output = output;
    }
  }
}
</script>
<style lang="postcss" scoped>
body,
p,
h1,
h2,
h3,
ul,
li,
pre {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.questions {
  padding: 20px 10px 100px 10px;
  h1,
  h2,
  h3 {
    font-weight: normal;
    line-height: 2em;
    color: #333;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 18px;
  }
  h3 {
    font-size: 16px;
  }
  .title {
    text-align: center;
  }
  .list {
    li {
      border: solid 1px #dcdcdc;
      padding: 10px 10px 0 10px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
  .code {
    margin-bottom: 10px;
    .code-input {
      color: #808080;
      display: flex;
      line-height: 1.5em;
      margin-bottom: 10px;
      justify-content: space-between;
      span:nth-child(2) {
        background: orange;
        color: #fff;
        padding: 0 10px;
        border-radius: 6px;
      }
    }
    pre {
      background: #f1f1f1;
      padding: 6px;
      color: #c1c1c1;
      border-radius: 6px;
    }
  }
}
</style>
