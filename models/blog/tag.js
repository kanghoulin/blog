(function(){
    module.exports = function(sequelize, DataTypes) {
        var Tag = sequelize.define('Tag', {
            tag_id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'ID'},
            tag_type: {type: DataTypes.INTEGER,defaultValue:'0',allowNull: false,comment:'类型 0文章 1图片'},
            tag_name:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:'名称',unique:true},
            tag_order: {type: DataTypes.INTEGER,defaultValue:'0',allowNull: false,comment:'排序'},
            tag_status:{type:DataTypes.ENUM,values:['0','-1'],defaultValue:'0',allowNull: false,comment:'状态'},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}
        });
        return Tag;
    }
}).call(this);