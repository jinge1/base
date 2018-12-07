// 获取url参数
export function getQueryString(name, url = location.href) {
  let queryJson = {}
  let search = url.match(/\?[^#/]+/)
  search = search
    ? search[0].replace('?', '')
    : ''
  if (search) {
    let queryArr = search.split('&')
    queryArr.forEach(item => {
      let eachQuery = item.split('=')
      queryJson[eachQuery[0]] = eachQuery[1]
    })
  }
  if (typeof name === 'string' && name.trim() !== '') {
    return queryJson[name]
  }
  return queryJson
}

// json数据转换为params字符串
export function jsonToParams(obj) {
  // obj为非空对象，则转换为params字符串
  if (typeof obj === 'object' && obj !== null) {
    let arr = []
    Object.keys(obj).forEach((key) => {
      let val = obj[key]
      if (typeof val === 'object') {
        arr.push(`${key}=${JSON.stringify(val)}`)
      } else {
        arr.push(`${key}=${val}`)
      }
    })
    return arr.join('&')
  } else {
    // 如果已经是字符串则返回，undefined则返回默认空字符串
    return obj || ''
  }
}

export function aPromise() {
  return new Promise((resolves, reject) => {
    setTimeout(() => {
      resolves('message from aPromise again 2')
    }, 2000)
  })
}

export function setRem() {
  const maxWidth = 750
  function setRem() {
    let htmlEle = document.querySelector('html')
    let docWidth = document.documentElement.clientWidth
    let realWidth = docWidth > maxWidth
      ? maxWidth
      : docWidth
    htmlEle.style.fontSize = realWidth / 7.5 + 'px'
  }
  setRem()
  window.addEventListener('resize', setRem, false)
}
