/**
 * Created by SamLi on 14-5-17.
 */
(function(){

    process.env.PORT=3000;

    //MYSQL 配置
    var MySqlConfigs={user:'root',pass:'123qwe',host:'192.168.1.108',port:3306};

    //缓存服务器配置
    var Memcached={
        host:'192.168.1.108',
        port:11211
    }

    var SqlQueryFormat={raw:true};

    module.exports = {
        MySqlConfigs:MySqlConfigs,
        Memcached:Memcached,
        SqlQueryFormat:SqlQueryFormat
    };
}).call(this);