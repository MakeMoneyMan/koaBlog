let request = require('request')

module.exports = {
    agent: async (ctx, next)=>{
        let url = ctx.request.url.split('=')[1] || '';
        if(url == '') {
            ctx.body = '地址错误'
        }
    
        await new Promise(function(resolve, reject) {
            var req = request({
                method: 'GET',
                encoding: null,
                // uri: 'http://images5.fanpop.com/image/photos/30900000/beautiful-pic-different-beautiful-pictures-30958249-1600-1200.jpg'
                uri: url
            }, function(err, response, body) {
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        }).then((body) => {
            ctx.status = 200;
            ctx.type = 'jpg';
            // console.log(Buffer.isBuffer(body));
            ctx.length = Buffer.byteLength(body);
            ctx.body = body;
        }).catch((err) => {
            console.error(err);
        });

    }
}