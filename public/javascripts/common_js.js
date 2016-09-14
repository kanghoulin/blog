$.ajaxSetup({
    type: "POST",
    dataType: "json",
    contentType: 'application/json'
});

//通用ajax请求
function sam_ajaxsend(name, pars, callback) {
    $.ajax(
        {
            url: name,
            data: JSON.stringify(pars),
            success: function (result) {
                if (result.code == 0) {
                    callback(result);
                }else {
                    alert(result.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //sam_ajaxerror(XMLHttpRequest, textStatus, errorThrown);
                alert(errorThrown);
            }
        });
}
//生成表格
function sam_createtable(tableid, tmplid, data) {
    var tablehtml = template.render(tmplid,data);
    $("#" + tableid).html(tablehtml);
}
