(function(){
    var async = require('async');
    var db_blog = require('../../models/blog');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;

    exports.article = function(req, res){
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
            res.render('blog/article/article',r);
        })
    };

    exports.art_info = function(req, res){
        var r = {};
        var pars = req.query;
        async.auto({
            get_tag:function(cb){
                db_blog.Tag.findAll({where:{tag_type:0},attributes:['tag_id','tag_name'],order:[['tag_order','ASC']]},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            },
            get_article_info:function(cb){
                db_blog.Article.find({where:{art_id:pars.art_id}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }
        },function(errs,results){
            if(errs){
                r.tag = [];
                r.article = {};
            }else{
                r.tag = results.get_tag;
                r.article = results.get_article_info;
            }
            res.render('blog/article/art_info',r);
        })
    };

    exports.get_article_list = function(req, res){
        var r = {code:0,message:'成功!'};
        var pars = req.body;
        async.auto({
            get_article_list:function(cb){
                db_blog.Article.findAll({where:{art_status:'0',tag_id:pars.tag_id},order:[['createtime','DESC']],limit:5},SqlQureyFormat).complete(function(db_err,db_result){
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
                r.article = [];
            }else{
                r.article = results.get_article_list;
            }
            res.json(r);
        })
    };

    function getSimpleText(html){
        var re1 = new RegExp("<.+?>|&nbsp;","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        var msg = html.replace(re1,'');//执行替换成空字符
        return msg;
    }
}).call();