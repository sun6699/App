//var _url = "http://cloud.jsapm.com/zhiyu/api/js/dizhi.js";
//var connurl = 'http://192.168.0.105:83';
//var connurl='http://kaifa.jsapm.com';
//var connurl='http://zhiyu.jsapm.com';

var connurl;
var suiji=Math.random()*100;
var _url = "http://cloud.jsapm.com/zhiyu/api/js/dizhi.js?v="+suiji;

function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}
var dd = function() {
    connurl = dizhi;
    //alert(connurl);
    // Here, do whatever you want
};
loadScript(_url, dd);

function getUser() {
    //同步返回结果：
    // var user = api.getPrefs({
    //     sync: true,
    //     key: 'user'
    // });
    var user = $api.getStorage('user');
    if (user && user != "") {
        //user = $api.strToJson(user);
        return user;
    } else {
        return user;
    }
}

function getCaozuo(CaidanUrl, CaozuoBs) {
    var res = false;
    // var caozuoList = api.getPrefs({
    //     sync: true,
    //     key: 'caozuo'
    // });
    var caozuoList = $api.getStorage('caozuo');
    if (caozuoList && caozuoList != "") {
        //caozuoList = $api.strToJson(caozuoList);
        for (var i = 0; i < caozuoList.length; i++) {
            if (caozuoList[i].CaozuoBs == CaozuoBs && caozuoList[i].CaidanUrl == CaidanUrl) {
                res = true;
            }
        }
    }
    return res;
}

function logout() {
    // api.removePrefs({
    //     key: 'user'
    // });
    // api.removePrefs({
    //     key: 'caozuo'
    // });
    $api.rmStorage('user');
    $api.rmStorage('caozuo');
    // var push = api.require('push');
    // push.unbind({
    //     userName:api.deviceId,
    //     userId:api.deviceId
    // },function(ret,err){
    //
    // });
}


//打开Frame

function openFrame(name, url, isbounces, x, y, w, h) {
    api.openFrame({
        name: name,
        url: url,
        bounces: isbounces,
        rect: {
            x: x,
            y: y,
            w: w,
            h: h
        }
    });
}

function OpenWin(name, url, data, Params, isbounces) {
    api.openWin({
        name: name,
        url: url,

        pageParam: Params,
        bounces: isbounces,
        vScrollBarEnabled: false,
        progress: {
            type: "default", //加载进度效果类型，默认值为 default，取值范围为 default|page，default 等同于 showProgress 参数效果；为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
            title: "正在努力加载中...", //type 为 default 时显示的加载框标题
            text: "坐下喝杯茶先", //type 为 default 时显示的加载框内容
            color: "" //type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
        },
        bgColor: '#fff',
        delay: 30
    });
}

function getheaderH() {
    return api.execScript({
        name: "root",
        frameName: 'main',
        script: 'getheaderhight();'
    });
    //return execIndexFun('getheaderhight();');
}

function getfooterH() {
    return api.execScript({
        name: "root",
        frameName: 'main',
        script: 'getfooterhight();'
    });
    //return execIndexFun('getfooterhight();');
}

// 关闭Frame
function closeFrame(framename) {
    api.closeFrame({
        name: framename
    });
}

//执行首页方法
function execIndexFun(fun) {
    api.execScript({
        name: "root",
        frameName: 'main',
        script: fun
    });
}
// 执行其他页面方法
function execPageFun(name, framename, fun) {
    api.execScript({
        name: name,
        frameName: framename,
        script: fun
    });
}

function historyBack(frameName) {
    api.historyBack({
        frameName: frameName
    }, function(ret, err) {
        if (!ret.status) {
            api.closeWin();
        }
    });

}

function OpenConfirmDialog(Tit, tishimsg, callback, bts) {
    if (bts == null) {
        bts = ['取消', '确定'];
    }
    var dialog = new auiDialog({})
    dialog.alert({
        title: Tit,
        msg: tishimsg,
        buttons: bts
    }, function(ret) {
        if (ret) {
            //alert(JSON.stringify(ret));
            if (ret.buttonIndex == 2) {
                callback(ret);
            }

        }
    })
}

//发送请求
function HttpRequest(url, data, callback) {
    //alert(url.indexOf('Login.aspx'));
    //alert(url= url.indexOf('.aspx?')!=-1?url+'&usid='+getUser().ID:url+'?usid='+getUser().ID);
    if (url.indexOf('usid=') < 0) {
        if (url.indexOf('Login.aspx') < 0 && url.indexOf('duanxin.aspx') < 0) {
            var user = $api.getStorage('user');
            if (user != undefined) {
                url = url.indexOf('.aspx?') > -1 ? url + '&usid=' + user.ID : url + '?usid=' + user.ID;
                url = url + "&mygsid=" + user.Gsid;
            }
        }

    }


    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
            url: url,
            method: 'post',
            data: data
        },
        function(ret, err) {
            api.hideProgress();
            callback(ret, err);
        });
}

//发送请求
function HttpRequestByGet(url, data, callback) {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
            url: url,
            method: 'get',
            data: data
        },
        function(ret, err) {
            if (ret) {
                api.hideProgress();
                callback(ret, err);
            } else {
                var msg = JSON.stringify(err);
                api.alert({
                    title: "请求的数据结果错误",
                    msg: msg
                });
            }

        });
}

function setCustomRefreshHeader(callback) {
    api.setCustomRefreshHeaderInfo({
        bgColor: '#fff',
        isScale: true,
        image: {
            pull: [
                'widget://image/refresh/refreshing_image_frame_01.png',
                'widget://image/refresh/refreshing_image_frame_02.png',
                'widget://image/refresh/refreshing_image_frame_03.png',
                'widget://image/refresh/refreshing_image_frame_04.png',
                'widget://image/refresh/refreshing_image_frame_05.png',
                'widget://image/refresh/refreshing_image_frame_06.png',
                'widget://image/refresh/refreshing_image_frame_07.png',
                'widget://image/refresh/refreshing_image_frame_08.png'
            ],
            load: [
                'widget://image/refresh/pull_end_image_frame_01.png',
                'widget://image/refresh/pull_end_image_frame_02.png',
                'widget://image/refresh/pull_end_image_frame_03.png',
                'widget://image/refresh/pull_end_image_frame_04.png',
                'widget://image/refresh/pull_end_image_frame_05.png'
            ]
        }
    }, function() {
        //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
        //下拉刷新被触发，使用 api.refreshHeaderLoadDone() 结束加载中状态
        //alert('开始加载刷新数据，摇一摇停止加载状态');
        // setTimeout(function () {
        //
        //
        //   callback();
        //   api.refreshHeaderLoadDone();
        // }, 1000);
        callback();

    });
}

function GetTupian(sourcetype, encodtype, dtype, callback) {
    api.getPicture({
        sourceType: sourcetype,
        encodingType: encodtype,
        mediaValue: 'pic',
        destinationType: dtype,
        //allowEdit: true,
        //quality: 50,
        // targetWidth: 100,
        // targetHeight: 100,
        saveToPhotoAlbum: false
    }, function(ret, err) {
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

//jquery获取复选框值
function getckval(elname) {
    var chk_value = [];
    $('input[name="' + elname + '"]:checked').each(function() {
        chk_value.push($(this).val());
    });
    return chk_value.length == 0 ? '' : chk_value.toString();
}

function setckval(elname, vals) {
    //去尾部逗号
    //赋值给数组
    if (vals.toString().indexOf(",") > -1) {
        if (vals != null) {
            var arr = vals.split(',');
            //判断该项目是否有AE
            if (arr.length > 0) {
                //如有则进行循环赋值

                for (var i = 0; i < arr.length; i++) {　　
                    $('input[name="' + elname + '"]').each(function() {

                        　　
                        if ($(this).val() == arr[i]) {　　
                            $(this).attr("checked", true);
                        }

                    });
                }
            }
        }
    } else {
        $('input[name="' + elname + '"]').each(function() {

            　　
            if ($(this).val() == vals) {　　
                $(this).attr("checked", true);
            }

        });
    }


}

//获取所有name为**的值 如 1,2,3
function getinputvalByName(elname) {
    var inputval = [];
    $('input[name="' + elname + '"]').each(function() {

        if ($(this).val().length > 0) {
            inputval.push($(this).val());
        }
    });
    return inputval.length == 0 ? '' : inputval.toString();
}


//根据value设置select 选中
function setSelectCheckedByValue(selectId, checkValue) {
    var select = document.getElementById(selectId);
    if (select != null) {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == checkValue) {
                select.options[i].selected = true;
                break;
            }
        }
    }
};

//根据name设置select 选中
function setSelectCheckedByName(selectId, checkName) {
    var select = document.getElementById(selectId);
    if (select != null) {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].innerHTML.toString().trim() == checkName.trim()) {
                select.options[i].selected = true;
                break;
            }
        }
    }

};

function PopMessage(type, msg) {
    var toast = new auiToast({});
    switch (type) {
        case "yes":
            toast.success({
                title: msg,
                duration: 2000
            });
            break;
        case "no":
            toast.fail({
                title: msg,
                duration: 2000
            });
            break;
        case "ok":
            toast.custom({
                title: msg,
                html: '<i class="aui-iconfont aui-icon-laud"></i>',
                duration: 2000
            });
            break;
        case "tip":
            toast.custom({
                title: msg,
                html: '<i class="aui-iconfont aui-icon-info"></i>',
                duration: 2000
            });
            break;
        default:
            // statements_def
            break;
    }
}

//获取当前时间，格式YYYY-MM-DD
function getFormatDate(date) {

    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

Date.prototype.diff = function(date) {
        return (this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
    }
    //自定义定义时间格式 用法：new Date().format('yyyy-MM-dd')
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function convertDateFromString(dateString) {
    if (dateString) {
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split('-');
        var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
        return date;
    }
}

//保留两位小数
//功能：将浮点数四舍五入，取小数点后2位
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}


//强制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
    var f = parseFloat(x);

    if (isNaN(f)) {
        return '0';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

//验证是否为手机号
function isPoneAvailable(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
