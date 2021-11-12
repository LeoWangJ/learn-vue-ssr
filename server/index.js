// node server
const express = require('express')
const fs = require('fs')
const app = express()
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const path = require('path')
const resolve = (file) => path.resolve(__dirname, file)

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../public/index.temp.html'), 'utf-8'),
  clientManifest
})

app.use(express.static('../dist/client', { index: false }))
app.get('*', async (req, res) => {
  try {
    const url = req.path
    if (url.includes('.')) { // 这里要做一个拦截，如果请求的是非 .html文件，就给他返回对应的 静态文件，如js, css, img, font...等
      const filePath = path.join(__dirname, '../dist/client', url)
      return await res.sendFile(filePath)
    }
    const context = {
      url: req.url
    }
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (err) {
    res.status(500).send('server error')
  } finally {

  }
})

app.listen(3000, () => {
  console.log('listening server: http://localhost:3000')
})
