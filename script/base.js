
//var __domain = "http://192.168.0.104";
var __domain = "http://yangguang.wxp.tuichu.net";

var path="/upload/";

var headerheight = 44;
var footerheight = 50;

//公用基础方法，每个页面都会调用
function baseload() {
    api.hideProgress();//防止一些页面还没来得及隐藏掉
}

//获取数据（返回json格式）
function getdata(url, param, callback) {
    //tat(param);
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: __domain + url,
        method: 'post',
        cache: false,
        timeout: 30,
        dataType: 'json',
        data: param
    }, function (ret, err) {
        api.hideProgress();
        if (err) {
            var msg = JSON.stringify(err);
            api.alert({
                title: "请求的数据结果错误",
                msg: msg
            });
        } else {
            callback(ret);
        }
    });
}

//获取数据（返回html格式）
function gethtml(url, param, callback) {
    tat(param);
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: __domain + url,
        method: 'post',
        cache: false,
        timeout: 30,
        dataType: 'text',
        data: param
    }, function (ret, err) {
        api.hideProgress();
        if (err) {
            var msg = JSON.stringify(err);
            api.alert({
                title: "请求的数据结果错误",
                msg: msg
            });
        } else {
            callback(ret);
        }
    });
}

//获取form参数
function getparams(formid) {
    var res = "";
    var param = $('#' + formid).serialize().split('&');
    for (var i = 0; i < param.length; i++) {
        if (res.length > 0) {
            res += ",";
        }
        var p2 = param[i].split("=");
        if (p2.length == 2) {
            res += '"' + p2[0] + '":"' + p2[1] + '"';
        }
    }
    tat('from:' + formid + '值为：{' + res + '}');
    return $api.strToJson('{' + res + '}');
}

//测试显示，为了方便统一屏蔽
function tat(msg) {
    //console.log(msg);
  api.alert({
      title: "提示信息",
      msg: msg
  });
}

function aalert(msg) {
    api.alert({
        title: "提示信息",
        msg: msg
    });
}
