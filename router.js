require('babel-register');
const R = require('koa-router');
let router = new R();


const index = require('./controllers/index')
const article = require('./controllers/article')


module.exports = router
    .get('/', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/article', async (ctx, next)=>{
        await article.article(ctx, next);
    })
    .post('/add', async (ctx, next)=>{
        await article.add(ctx, next);
    })
    .get('/detail', async (ctx, next)=>{
        console.log('detail');
        await article.detail(ctx, next);
    })
    .get('/article', async (ctx, next)=>{
        await next();
        ctx.response.body = "user";
    })
    .get('/login/:id', async (ctx, next)=>{
        await next();
        // console.log(JSON.stringify(ctx.params.username))
        // ctx.response.body = JSON.stringify(ctx.params.username);
        ctx.response.body = "login!!!" + ctx.params.id;
    })


