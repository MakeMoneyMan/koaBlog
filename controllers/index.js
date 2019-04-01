
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    _id: Number,
    title: String,
    content: String,
    date: Date
});

module.exports = {
    index: async (ctx, next) => {
        // ctx.response.body = 'new index';
        let myModel = mongoose.model('BlogPostModel');
        let result = await find(myModel);
        // console.log(result);
        ctx.state = {title: "网站标题"}
        await ctx.render('index', {title: "网站标题", list: result})
    }
}

async function find(myModel){
    return new Promise((resolve, reject)=>{
        myModel.find((err, result)=>{
            // console.log('err')
            // console.log(err)
            if(err){ reject("添加失败") }
            else {resolve(result);}
        });
    })
}