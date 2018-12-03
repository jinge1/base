const express = require('express')
const app = express()

// 设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api', (req, res) => res.send({msg: 'hello'}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
