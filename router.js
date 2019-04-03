require('babel-register');
const R = require('koa-router');
let router = new R();


const index = require('./controllers/index')
const article = require('./controllers/article')


module.exports = router
    .get('/', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/login', async (ctx, next)=>{
        await index.login(ctx, next);
    })
    .post('/login_post', async (ctx, next)=>{
        await index.login_post(ctx, next);
        // await index.index(ctx, next);
    })
    .get('/list', async (ctx, next)=>{
        await index.list(ctx, next);
    })
    .get('/article', async (ctx, next)=>{
        await article.article(ctx, next);
    })
    .post('/add', async (ctx, next)=>{
        await article.add(ctx, next);
    })
    .get('/detail/:id', async (ctx, next)=>{
        // console.log('detail');
        await article.detail(ctx, next);
    })
    .get('/article', async (ctx, next)=>{
        ctx.response.body = "user";
    })
    .get('/login/:id', async (ctx, next)=>{
        await next();
        // console.log(JSON.stringify(ctx.params.username))
        // ctx.response.body = JSON.stringify(ctx.params.username);
        ctx.response.body = "login!!!" + ctx.params.id;
    })


