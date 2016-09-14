(function(){
    module.exports = function(sequelize, DataTypes) {
        var User = sequelize.define('User', {
            user_id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'帐号ID'},
            user_name:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:'帐号',unique:true},
            user_nick:{type:DataTypes.STRING(20),defaultValue:'',allowNull: false,comment:'姓名'},
            user_pass:{type:DataTypes.STRING(32),defaultValue:'',allowNull: false,comment:'密码'},
            user_salt:{type:DataTypes.STRING(32),defaultValue:'',allowNull: false,comment:'salt'},
            user_status:{type:DataTypes.ENUM,values:['0','-1'],defaultValue:'0',allowNull: false,comment:'状态'},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}
        });
        return User;
    }
}).call(this);