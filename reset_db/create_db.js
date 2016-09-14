(function () {

    var async = require('async');
    var system = require('../models/system');
    //重置所有表结构
    function create_table() {
        async.auto({
            check_system: function (cb) {
                system.sequelize.sync({force: true}).then(function (err) {
                    cb(err);
                });
            }
        }, function (err, results) {
            console.log(err);
        })
    }
    //创建所有表
    //create_table();
}).call(this);