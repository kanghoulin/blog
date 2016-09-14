(function(){
    var async = require('async');
    var Tools = require('../../tools/tool_helper.js');
    var db_system = require('../../models/system');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;

    exports.login = function(req, res){
        res.render('system/login',{});
    };

    exports.quit = function(req, res){
        res.render('system/login',{});
    };

    exports.post_login = function(req, res){
        var r = {code:0,message:'成功!'};
        async.auto({
            check_pars:function(cb){
                var pars = req.body;
                cb(null,pars);
            },
            get_user:['check_pars',function(result,cb){
                var pars = result.check_pars;
                var condition = {user_name:pars.user_name},attributes = ['user_pass','user_salt','user_status'];
                db_system.User.find({where:condition,attributes:attributes},SqlQureyFormat).complete(function(db_err,db_result){
                    if(db_err){
                        cb(db_err);
                    }else if(db_result){
                        if(db_result.user_status == '0' && db_result.user_pass == Tools.MD5((Tools.MD5(pars.user_pass)+db_result.user_salt))){
                            cb();
                        }else{
                            cb('用户密码不正确，请重新输入！');
                        }
                    }else{
                        cb('用户不存在！');
                    }
                });
            }]
        },function(errs,results){
            if(errs){
                r.code = 200;
                r.message = errs;
            }
            res.json(r);
        })
    };
}).call();