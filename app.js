require('babel-register');
const Koa = require('koa');
const router = require('koa-router')();
const myrouter = require('./router.js');
const mongoose = require('mongoose')
mongoose.connect('mongodb://119.29.92.54/my_first', { useNewUrlParser: true }).then(res=>{
        
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const BlogPost = new Schema({
        _id: ObjectId,
        title: String,
        content: String,
        date: Date
    });
    
    const myModel = mongoose.model('BlogPostModel', BlogPost);
    const instance = new myModel();
    instance.title = "测试标题";
    instance.content = "测试内容";
    instance.date = new Date();
    instance.save(function(error){
        
    })
})



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

