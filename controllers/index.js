const views = require('koa-views');

module.exports = {
    index: async (ctx, next) => {
        ctx.response.body = 'new index';
        next()
    }
}