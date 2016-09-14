(function () {
    var crypto = require('crypto');

    function md5(str){
        var md5sum = crypto.createHash('md5');
        md5sum.update(str);
        return md5sum.digest('hex').trim().toLowerCase();
    }
    exports.MD5 = md5;
}).call(this);
