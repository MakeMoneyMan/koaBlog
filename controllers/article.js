
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    _id: String,
    title: String,
    content: String,
    date: Date
});

async function save(instance){
    return new Promise((resolve, reject)=>{
        instance.save((err)=>{
            console.log(err)
            if(err){ reject("添加失败") }
            else {resolve("添加成功");}
        });
    })
}
module.exports = {
    article: async function(ctx, next){
        await ctx.render('article')
    },
    add: async function(ctx, next){
        
        const myModel = mongoose.model('BlogPostModel');
        let instance = new myModel({
            _id: mongoose.Types.ObjectId().toHexString(),
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            date: new Date()
        });
        // console.log(instance);
        let result;
        await save(instance).then(res=>{
            console.log(res);
            result = res;
            // ctx.response.body = res;
        });

        await ctx.render('add', {msg: result});
    },
    detail: async function(ctx, next){
        const myModel = mongoose.model('BlogPostModel');
        var result = await find(myModel, {_id: ctx.params.id});
        var obj = {};
        Object.assign(obj, result[0]);
        console.log(obj._doc);
        await ctx.render('detail', obj._doc);
        // await myModel.find({_id: ctx.params.id}, function(err, result){

        //     // console.log(result[0]);
        //     ctx.render('detail', result[0]);
        // });
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