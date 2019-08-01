require('babel-register');
const R = require('koa-router');
let router = new R();


const index = require('./controllers/index')
const article = require('./controllers/article')
const util = require('./controllers/util')


module.exports = router
    .get('/', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/list/:number', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/search/:keyword', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/login', async (ctx, next)=>{
        await index.login(ctx, next);
    })
    .post('/login', async (ctx, next)=>{
        await index.login_post(ctx, next);
        // await index.index(ctx, next);
    })
    .get('/admin/list', async (ctx, next)=>{
        await article.list(ctx, next);
    })
    .get('/article', async (ctx, next)=>{
        await article.article(ctx, next);
    })
    .get('/article/:id', async (ctx, next)=>{
        await article.article(ctx, next);
    })
    .post('/add', async (ctx, next)=>{
        await article.add(ctx, next);
    })
    .get('/detail/:id', async (ctx, next)=>{
        // console.log('detail');
        await article.detail(ctx, next);
    })
    .get('/login/:id', async (ctx, next)=>{
        await next();
        // console.log(JSON.stringify(ctx.params.username))
        // ctx.response.body = JSON.stringify(ctx.params.username);
        ctx.response.body = "login!!!" + ctx.params.id;
    })
    .get('/delete/:id', async function(ctx, next){
        await article.delete(ctx, next);
    })
    .post('/upload', async function(ctx, next){
        await index.upload(ctx, next);
    })
    .get('/api/like/:id', async (ctx, next) => {
        await article.like(ctx, next)
    })
    .get('/util/agent', async (ctx, next) => {
        await util.agent(ctx, next)
    })


