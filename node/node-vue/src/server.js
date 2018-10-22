//express_demo.js 文件
// const fs = require('fs')
const path = require('path')
const serverRenderer = require('vue-server-renderer')
const express = require('express')
let nodeApp = express()
const createApp = require('../dist/server-bundle.js')['default']

const distDir = path.join(__dirname, '..', 'dist')
nodeApp.use('/', express.static(distDir))

const clientBundleFileUrl = '/bundle.client.js'

// let renderer = serverRenderer.createRenderer({
//   template: fs.readFileSync('./src/index.template.html', 'utf-8')
// })
let renderer = serverRenderer.createRenderer()

// getHomeInfo请求
nodeApp.get('/api/getHomeInfo', (req, res) => {
  res.send('getHomeInfo -- 来自接口')
})

nodeApp.get('/api/getAboutInfo', (req, res) => {
  res.send('getAboutInfo -- 来自接口')
})

nodeApp.get('*', function(req, res) {
  console.log('*')
  const context = {
    url: req.url
  }
  createApp(context).then(app => {
    let state = JSON.stringify(context.state)
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Vue2.0 SSR渲染页面</title>
                    <script>window.__INITIAL_STATE__ = ${state}</script>
                    <script src="${clientBundleFileUrl}"></script>
                </head>
                <body>
                    ${html}
                </body>
            </html>
        `)
      }
    })
  })

})

var server = nodeApp.listen(8081, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)

})
