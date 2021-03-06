const createApp = require('./src/app')

const server = require('express')();

const template = require('fs').readFileSync('./index.template.html', 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
  template,
});

const context = {
    title: 'vue ssr',
    meta: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};
server.get('*', (req, res) => {
    const data = { url: req.url }
    const app = createApp(data)

    renderer
    .renderToString(app,context).then(html=>{
        console.log(html)
        res.end(html);
    }).catch(err=>{
        console.log(err)
        res.status(500).end('Internal Server Error')
    });
  })
  

server.listen(5000,()=>{
    console.log('http://localhost:5000')
})