
module.exports = {
    index: async (ctx, next) => {
        // ctx.response.body = 'new index';
        ctx.state = {title: "网站标题"}
        await ctx.render('index', {title: "网站标题", list: [{"title": '标题1'},{"title": '标题2'},{"title": '标题3'}]})
    }
}