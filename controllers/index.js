const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');

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
            title: "草果网", 
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
    },
    upload: async (ctx, next)=>{

        let file = ctx.request.files[Object.keys(ctx.request.files)[0]];
        let readStream = fs.createReadStream(file.path);
        let fileName = (new Date().valueOf()).toString() + Math.ceil(Math.random() * 1000000).toString() * 100 + file.name;


        var accessKey = '7BRQWrOtRTW8wjUh631mFKSFMX66cVe_lLtLX6aU';
        var secretKey = 'Dl10pm6H2UrihxYBuTyWy4g3QEzlO3NcqRI6aeHa';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var options = {
            scope: "wjhbucket",
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);
        var putExtra = new qiniu.form_up.PutExtra();
        var readableStream = readStream; // 可读的流
        var result = await upload(uploadToken, fileName, readableStream, putExtra);
        console.log(result);
        ctx.body = JSON.stringify({"errno":0, "data": ['http://bucket.icaoguo.com/' + result.respBody.key]});
        // await formUploader.putStream(uploadToken, fileName, readableStream, putExtra, function(respErr, respBody, respInfo) {
        //     if (respErr) {
        //         throw respErr;
        //     }
            
        //     if (respInfo.statusCode == 200) {
        //         console.log(respBody);
        //     } else {
        //         console.log(respInfo.statusCode);
        //         console.log(respBody);
        //     }
        // });

        // ctx.set("Content-Type", "application/json");

        // console.log(ctx.request.files[Object.keys(ctx.request.files)[0]]);
        // let file = ctx.request.files[Object.keys(ctx.request.files)[0]];
        // let readStream = fs.createReadStream(file.path);
        // let fileName = path.join(__dirname, '../public/upload/') + `/${file.name}`;
        // // let path = fileName;
        // let writeStream = fs.createWriteStream(fileName);
        // readStream.pipe(writeStream);
        // console.log({"error":0, "data": ['/upload/'+file.name]}.toString());

    }
}

async function upload(uploadToken, fileName, readableStream, putExtra){
    var config = new qiniu.conf.Config();
    var formUploader = new qiniu.form_up.FormUploader(config);
    return new Promise(function(resolve, reject){

        formUploader.putStream(uploadToken, fileName, readableStream, putExtra, function(respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr);
                // throw respErr;
            }
            
            if (respInfo.statusCode == 200) {
                // console.log(respBody);
                resolve({respInfo:respInfo, respBody: respBody});
            } else {
                // console.log(respInfo.statusCode);
                // console.log(respBody);
                resolve({respInfo:respInfo, respBody: respBody});
            }
            // ctx.body = JSON.stringify({"errno":0, "data": [respBody.key]});
        });
    });
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