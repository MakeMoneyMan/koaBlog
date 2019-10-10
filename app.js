require('babel-register');
const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser')
const myrouter = require('./router.js');
const mongoose = require('mongoose');
const view = require('koa-views');
const body = require('koa-body');
// const nunjucks = require('nunjucks');
const session = require('koa-session');
const config = require('./config')


mongoose.connect(config.dburl, { useNewUrlParser: true }).then(res=>{
        
    // //    表的实例                collcetion名字(表名)
    // const myModel = mongoose.model('BlogPostModel', BlogPost);


    // //删
    // // myModel.remove({_id: 1553787387580}, (err, data)=>{
    // //     console.log(data);
    // // });

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    // console.log(ObjectId())
    const BlogPost = new Schema({
        // _id: ObjectId,
        title: String,
        content: String,
        is_headline: Number,
        hot: Number,
        description: String,
        category: String,
        is_del: Number,
        date: Date
    });
    mongoose.model('BlogPostModel', BlogPost);
    // //查
    // myModel.find((err, data)=>{
    //     console.log(data);
        
    // //改
    // // let item = new myModel(data[0]);
    // // item.title = "新的标题"
    // // item.save(function(error){
    // //     console.log(error);
    // // })
    // });

    //增
    //实例 列表
    // const instance = new myModel({
    //     _id: new Date().valueOf(),
    //     title: "String",
    //     content: "String"
    // });
    // instance.title = "测试标题";
    // instance.content = "测试内容";
    // instance.date = new Date();
    // instance.save(function(error){
    //     console.log(error)
    // })

})



const app = new Koa();
app.use(body({
    multipart: true
}));
app.keys = ['some secret hurr'];
app.use(session({}, app));
app.use(view(__dirname + '/views', { map: {html: 'nunjucks' }}))
app.use(bodyparser());
app.use(myrouter.routes());
app.use(require('koa-static-server')({rootDir: 'public'}));
app.use(router.allowedMethods());

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

