const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const BlogPost = new Schema({
//     _id: String,
//     title: String,
//     content: String,
//     date: Date
// });

async function save(instance){
    return new Promise((resolve, reject)=>{
        instance.save((err)=>{
            // console.log(err)
            if(err){ reject("添加失败") }
            else {resolve("添加成功");}
        });
    })
}
module.exports = {
    article: async function(ctx, next){
        if(!ctx.session.username) ctx.redirect('/login');
        let result = {};
        result.hot = 0;
        let id = ctx.params.id || '';
        if(id){
            const myModel = mongoose.model('BlogPostModel');
            result = await myModel.find({_id: id}).exec();
            result = result[0];
        }
        // console.log(result[0]);
        await ctx.render('article', {content: result});
    },
    add: async function(ctx, next){
        if(!ctx.session.username) ctx.redirect('/login');
        const myModel = mongoose.model('BlogPostModel');

        let request = ctx.request.body;
        
        if(!request._id) {
            delete request._id;
        }
        request.is_headline = request.is_headline || 0;
        request.hot = parseInt(request.hot);
        request.date = new Date();
        // console.log(typeof request._id);
        console.log(request);

        if(!request._id) {
            let result = await myModel.create(request);
        } else {
            let result = await myModel.updateOne({_id: request._id}, request, {upsert: true});
        }
        // console.log(result);

        // let instance = new myModel({
        //     _id: mongoose.Types.ObjectId().toHexString(),
        //     title: ctx.request.body.title,
        //     content: ctx.request.body.content,
        //     hot: ctx.request.body.hot,
        //     category: ctx.request.body.category,
        //     description: ctx.request.body.description,
        //     is_headline: ctx.request.body.is_headline == "on"? 1 : 0,
        //     date: new Date()
        // });
        // // console.log(instance);
        // let result;
        // await save(instance).then(res=>{
        //     // console.log(res);
        //     result = res;
        //     // ctx.response.body = res;
        // });

        await ctx.render('add', {msg: "result"});
    },
    detail: async function(ctx, next){
        const myModel = mongoose.model('BlogPostModel');
        // console.log(typeof ctx.params.id);
        var result = await find(myModel, {_id: ctx.params.id});
        var obj = {};
        Object.assign(obj, result[0]);

        //hot
        let hot = await myModel.find({hot: {$gt: 0}});

        obj._doc.hot = hot;

        await ctx.render('detail', obj._doc);
    },
    list: async (ctx, next) => {
        if(!ctx.session.username) ctx.redirect('/login');
        let myModel = mongoose.model('BlogPostModel');
        let result = await myModel.find().sort({date: -1});
        ctx.state = {title: "网站标题"}
        await ctx.render('list', {title: "网站标题", list: result})
    },
    delete: async (ctx, next) => {

        let myModel = mongoose.model('BlogPostModel');
        let result = await myModel.updateOne({_id: ctx.params.id}, {is_del: 1});
        ctx.body = '<script>alert("删除成功"); window.location.href="/login"</script>';


    }
}

async function find(myModel, obj){
    return new Promise((resolve, reject)=>{
        myModel.find(obj, (err, result)=>{
            // console.log('err')
            // console.log(err)
            if(err){ reject("添加失败") }
            else {resolve(result);}
        });
    })
}