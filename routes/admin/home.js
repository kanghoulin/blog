(function(){
    var async = require('async');
    var db_system = require('../../models/system');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;

    exports.index = function(req, res){
        res.render('admin/index',{});
    };


    exports.post_login = function(req, res){
        async.auto({
            check_pars:function(cb){
                var pars = req.body;
                cb(null,pars);
            },
            get_user:['check_pars',function(result,cb){
                var condition = {},attributes = [];
                db_system.User.findAll({where:{},attributes:attributes},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }]
        },function(errs,results){
            res.json({code:0,message:'�ɹ���'});
        })
    };
}).call();