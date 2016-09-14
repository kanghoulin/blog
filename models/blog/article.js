(function(){
    module.exports = function(sequelize, DataTypes) {
        var Article = sequelize.define('Article', {
            art_id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'ID'},
            art_title:{type:DataTypes.STRING(100),defaultValue:'',allowNull: false,comment:'标题'},
            tag_id: {type: DataTypes.INTEGER.UNSIGNED,defaultValue:'0',allowNull: false,comment:'ID'},
            tag_name:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:'名称'},
            art_content:{type:DataTypes.TEXT,defaultValue:'',allowNull: false,comment:'内容'},
            user_id: {type: DataTypes.INTEGER.UNSIGNED,defaultValue:'0',allowNull: false,comment:'帐号ID'},
            user_name:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:'帐号'},
            art_status:{type:DataTypes.ENUM,values:['0','-1'],defaultValue:'0',allowNull: false,comment:'状态'},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}
        });
        return Article;
    }
}).call(this);