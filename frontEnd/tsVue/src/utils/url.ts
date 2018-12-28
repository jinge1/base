// 获取url参数
// export function getQueryString(name: any, url: string = location.href) {
//   let queryJson = {}
//   let search = url.match(/\?[^#/]+/)
//   search = search
//     ? search[0].replace('?', '')
//     : ''
//   if (search) {
//     let queryArr = search.split('&')
//     queryArr.forEach(item => {
//       let eachQuery = item.split('=')
//       queryJson[eachQuery[0]] = eachQuery[1]
//     })
//   }
//   if (typeof name === 'string' && name.trim() !== '') {
//     return queryJson[name]
//   }
//   return queryJson
// }
//
// // json数据转换为params字符串
// export function jsonToParams(obj: object) {
//   // obj为非空对象，则转换为params字符串
//   if (typeof obj === 'object' && obj !== null) {
//     let arr = []
//     Object.keys(obj).forEach((key) => {
//       let val = obj[key]
//       if (typeof val === 'object') {
//         arr.push(`${key}=${JSON.stringify(val)}`)
//       } else {
//         arr.push(`${key}=${val}`)
//       }
//     })
//     return arr.join('&')
//   } else {
//     // 如果已经是字符串则返回，undefined则返回默认空字符串
//     return obj || ''
//   }
// }
//
export function aPromise(): object {
  return new Promise((resolves, reject) => {
    setTimeout(() => {
      resolves("message from aPromise");
    }, 2000);
  });
}


export function ap(name: string): string {
  return name;
}

export function ap2(): string {
  localStorage.setItem("aha", "1");
  return localStorage.getItem("aha");
}

function deepCopy(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.reduce((pre, current) => {
      pre.push(deepCopy(current));
      return pre;
    }, []);
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((pre: any, current: any) => {
      if (obj.hasOwnProperty(current)) {
        pre[current] = deepCopy(obj[current]);
      }
      return pre;
    }, {});
  } else {
    return obj;
  }
}

function deepAssign(...objs: any[]): any {
  return objs.reduce((pre, next) => {
    Object.keys(next).forEach(key => {
      if (next.hasOwnProperty(key)) {
        // 忽略原型上的属性
        let nextValue = next[key];
        if (typeof nextValue === "object") {
          if (pre.hasOwnProperty(key)) {
            let preValue = pre[key];
            if (Array.isArray(nextValue)) {
              // array replace
              pre[key] = deepCopy(nextValue);
            } else {
              if (Array.isArray(preValue)) {
                pre[key] = deepCopy(nextValue);
              } else if (typeof preValue === "object") {
                pre[key] = deepAssign(preValue, nextValue);
              } else {
                pre[key] = deepCopy(nextValue);
              }
            }
          } else {
            pre[key] = deepCopy(nextValue);
          }
        } else {
          pre[key] = nextValue;
        }
      }
    });
    return pre;
  }, {});
}

let o = {
  name: "lixiong",
  age: 18,
  other: {
    thirdname: "third"
  },
  arr: [3, 2, 1]
};

let o1 = {
  name: "jinge",
  other: {
    secondName: "987"
  }
};
let o2 = deepAssign(o, o1);
o2.n = 200;
console.log(o);
console.log(o1);
console.log(o2);
