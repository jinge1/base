
/**
 * 深拷贝
 * @param obj 
 */
export function deepCopy(obj: any): any {
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

// 深合并
export function deepAssign(...objs: any[]): any {
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

export function splitArr(arr: any[], splitNum: number) {
  return arr.reduce((pre, next, index) => {
    let parentIndex = Math.floor(index / splitNum);
    if (typeof pre[parentIndex] === "undefined") {
      pre[parentIndex] = [];
    }
    pre[parentIndex].push(next);
    return pre;
  }, []);
}

export function ajax(item: number[]) {
  return new Promise((resolve, rejext) => {
    setTimeout(() => {
      resolve(`ajax ${item}`);
    }, 1000);
  });
}

export function toFetch(arr: any[], index = 0, callback= (msg: any) => { console.log(msg) }) {
  if (index < arr.length) {
    ajax(arr[index]).then(res => {
      callback(res)
      toFetch(arr, index + 1, callback);
    });
  } else {
    callback('over !')
  }
}
