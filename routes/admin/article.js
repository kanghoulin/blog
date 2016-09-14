(function(){
    var async = require('async');
    var db_blog = require('../../models/blog');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;

    exports.w_art = function(req, res){
        var r = {};
        async.auto({
            get_tag:function(cb){
                db_blog.Tag.findAll({where:{tag_status:'0',tag_type:0},attributes:['tag_id','tag_name'],order:[['tag_order','ASC']]},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }
        },function(errs,results){
            if(errs){
                r.tag = [];
            }else{
                r.tag = results.get_tag;
            }
            res.render('admin/article/w_art',r);
        })
    };

    exports.post_w_art = function(req, res){
        var r = {code:0,message:'成功!'};
        var pars = req.body;
        console.log(pars);
        async.auto({
            save_article:function(cb){
                var data = pars;
                db_blog.Article.create(data,SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            }
        },function(errs,results){
            if(errs){
                r.code = 200;
                r.message = errs;
            }
            res.json(r);
        })
    };
}).call();