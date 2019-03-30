require('babel-register');
const Koa = require('koa');
const R = require('koa-router');
let router = new R();


const index = require('./controllers/index')

console.log(index.index)
module.exports = router
    .get('/', async (ctx, next)=>{
        await index.index(ctx, next);
    })
    .get('/hello', async (ctx, next)=>{
        await next();
        ctx.response.body = "hello";
    })
    .get('/user', async (ctx, next)=>{
        await next();
        ctx.response.body = "user2333";
    })
    .get('/admin', async (ctx, next)=>{
        await next();
        ctx.response.body = "user";
    })
    .get('/login/:id', async (ctx, next)=>{
        await next();
        // console.log(JSON.stringify(ctx.params.username))
        // ctx.response.body = JSON.stringify(ctx.params.username);
        ctx.response.body = "login!!!" + ctx.params.id;
    })


