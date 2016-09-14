var system_routes = require('./routes/system');
var blog_routes = require('./routes/blog');
var admin_routes = require('./routes/admin');

module.exports=function(app) {
    /*app.param(function (name, fn) {
        if (fn instanceof RegExp) {
            return function (req, res, next, val) {
                var captures;
                if (captures = fn.exec(String(val))) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            }
        }
    });*/

    /*------------------no auth method----------------------*/

    app.get('/login', system_routes.user.login);
    app.post('/login', system_routes.user.post_login);

    app.get('/quit', system_routes.user.quit);

    app.get('/', blog_routes.home.home);
    app.get('/home', blog_routes.home.home);
    app.get('/photo', blog_routes.photo.photo);
    app.get('/article', blog_routes.article.article);
    app.post('/article/list', blog_routes.article.get_article_list);
    app.get('/art_info', blog_routes.article.art_info);


    app.get('/canvas/blocks', blog_routes.home.canvas_blocks);
    app.get('/canvas/firefly', blog_routes.home.canvas_firefly);
    app.get('/canvas/fireworks', blog_routes.home.canvas_fireworks);
    app.get('/canvas/flashs', blog_routes.home.canvas_flashs);

    app.get('/canvas/flowers', blog_routes.home.canvas_flowers);
    app.get('/canvas/honeycombs', blog_routes.home.canvas_honeycombs);
    app.get('/canvas/letter', blog_routes.home.canvas_letter);
    app.get('/canvas/milkyway', blog_routes.home.canvas_milkyway);

    app.get('/canvas/rotation', blog_routes.home.canvas_rotation);
    app.get('/canvas/sky', blog_routes.home.canvas_sky);
    app.get('/canvas/stars', blog_routes.home.canvas_stars);

    /*------------------must be auth method------------------*/

    app.get('/admin/index', admin_routes.home.index);
    app.get('/admin/w_art', admin_routes.article.w_art);
    app.post('/admin/w_art', admin_routes.article.post_w_art);
}