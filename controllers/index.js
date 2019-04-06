
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const BlogPost = new Schema({
//     _id: Number,
//     title: String,
//     content: String,
//     date: Date
// });
//try push

module.exports = {
    index: async (ctx, next) => {
        let number = ctx.params.number || 1;
        let now_number = ctx.params.number || 1;
        now_number = now_number - 0;
        number--;
        let page = 10; //每页几条

        let option = {is_del: {$ne: 1}};
        let keyword = ctx.params.keyword || '';
        if(keyword) {
            let reg = new RegExp(keyword, 'i'); //不区分大小写
            option.$or= [{title: reg}, {category: reg}];
        }
        // console.log(ctx.session.username)

        let myModel = mongoose.model('BlogPostModel');
        let total = await myModel.countDocuments(); //分页总条数
        let result = await myModel.find(option).skip(number * page).limit(page).sort({'_id': -1}).exec();
        // console.log(result);

        //hot
        let hot = await myModel.find({hot: {$gt: 0}});

        await ctx.render('index', {
            title: "网站标题", 
            list: result, 
            number: now_number, 
            total: [].slice.call({length: Math.ceil(total / page)}),
            hot: hot,
            keyword: keyword,
            is_login: ctx.session.username
        });

        // await ctx.render('index', {title: "网站标题", list: result});
    },
    login: async (ctx, next) => {
        if(ctx.session.username) ctx.redirect('/admin/list');
        // ctx.response.body = 'new index';
        let myModel = mongoose.model('BlogPostModel');
        let result = await find(myModel);
        // console.log(result);
        ctx.state = {title: "网站标题"}
        await ctx.render('login', {title: "网站标题", list: result})
    },
    login_post: async (ctx, next) => {
        // ctx.response.body = 'new index';
        if(ctx.request.body.password == 'x251248963') {
            ctx.session.username = 'wjh';
            ctx.redirect('/admin/list');
        } else {
            ctx.body = '<script>alert("账号或密码错误！"); window.location.href="/login"</script>';
        }
        
        // let myModel = mongoose.model('BlogPostModel');
        // let result = await find(myModel);
        // // console.log(result);
        // ctx.state = {title: "网站标题"}
        // await ctx.render('index', {title: "网站标题", list: result})
    }
}

async function find(myModel){
    return new Promise((resolve, reject)=>{
        myModel.find().sort({'_id': -1}).exec((err, result)=>{
            // console.log('err')
            // console.log(err)
            if(err){ reject("添加失败") }
            else {resolve(result);}
        });
    })
}