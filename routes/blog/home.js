(function(){
    var async = require('async');
    var db_system = require('../../models/system');
    var db_blog = require('../../models/blog');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;

    exports.canvas_blocks = function(req, res){
        res.render('blog/canvas/blocks',{});
    };
    exports.canvas_firefly = function(req, res){
        res.render('blog/canvas/firefly',{});
    };
    exports.canvas_fireworks = function(req, res){
        res.render('blog/canvas/fireworks',{});
    };
    exports.canvas_flashs = function(req, res){
        res.render('blog/canvas/flashs',{});
    };
    exports.canvas_flowers = function(req, res){
        res.render('blog/canvas/flowers',{});
    };
    exports.canvas_honeycombs = function(req, res){
        res.render('blog/canvas/honeycombs',{});
    };
    exports.canvas_letter = function(req, res){
        res.render('blog/canvas/letter',{});
    };
    exports.canvas_milkyway = function(req, res){
        res.render('blog/canvas/milkyway',{});
    };
    exports.canvas_rotation = function(req, res){
        res.render('blog/canvas/rotation',{});
    };
    exports.canvas_sky = function(req, res){
        res.render('blog/canvas/sky',{});
    };
    exports.canvas_stars = function(req, res){
        res.render('blog/canvas/stars',{});
    };

    exports.home = function(req, res){
        var r = {};
        async.auto({
            get_tag:function(cb){
                db_blog.Tag.findAll({where:{tag_type:0},attributes:['tag_id','tag_name'],order:[['tag_order','ASC']]},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            },
            get_article:function(cb){
                db_blog.Article.findAll({where:{art_status:'0'},order:[['createtime','DESC']],limit:5},SqlQureyFormat).complete(function(db_err,db_result){
                    if(db_err){
                        cb(db_err);
                    }else{
                        async.forEach(db_result,function(each_item,each_callback){
                            each_item.art_content = getSimpleText(each_item.art_content).substring(0,200)+'...';
                            each_callback();
                        },function(each_err){
                            cb(null,db_result);
                        })
                    }
                });
            }
        },function(errs,results){
            if(errs){
                r.tag = [];
                r.article = [];
            }else{
                r.tag = results.get_tag;
                r.article = results.get_article;
            }
            res.render('blog/home',r);
        })
    };

    function getSimpleText(html){
        var re1 = new RegExp("<.+?>|&nbsp;","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(re1,'');//执行替换成空字符
        return msg;
    }
}).call();