require('babel-register');
const Koa = require('koa');
const router = require('koa-router')();
const myrouter = require('./router.js');
const app = new Koa();

app.use(myrouter.routes());

app.listen('3000');


// app.use(async (ctx, next) => {
//     await next();
//     ctx.body = '11111111';

// });

// app.use(async (ctx, next) => {
//     await next();
//     ctx.body = '2222222';

// });

// app.use(async (ctx, next) => {
//     await next();
//     ctx.body = '3333333333';

// });

// router
//     .get('/hello', async (ctx, next)=>{
//         await next();
//         ctx.response.body = "hello";
//     })
//     .get('/user', async (ctx, next)=>{
//         await next();
//         ctx.response.body = "user";
//     })

