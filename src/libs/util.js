import axios from 'axios';
import env from '../config/env';
import schoolData from './school.js';

let util = {

};
util.env = env === 'development' ? 'dev' : 'prod';
util.title = function(title) {
    title = title ? title : '-二货-';
    window.document.title = title;
};
util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};
util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};
util.formatSchool = function (school_id) {
    for (let val in schoolData) {
        for (let i = 0; i < schoolData[val].length; i++) {
            if (school_id == Number(schoolData[val][i].id)) {
                return schoolData[val][i].name;
            }
        }
    }
    return '未知';
}
util.formatDate = function(timestamp) {
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '年';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    let D = date.getDate() + '日';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
}
util.formatDateByNow = function (timestamp) {
    // 补全为13位
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }
    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
}
util.formatSex = function(val) {
    if (val === 'male') {
        return '男生';
    } else {
        return '女生';
    }
}
util.formatPhone =function (val) {
    if (val) {
        return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    } else {
        return val;
    }
}
// 格式化交易方式
util.formatType = function (val) {
    switch (val) {
        case 0:
        return '送货上门/自提';
        case 1: 
        return '送货上门';
        case 2:
        return '自提';
    }
}
util.formatUserData = function(data) {
    if (data.user_sid) {
        data.user_sid = this.formatSchool(data.user_sid);
    }
    if (data.user_sex) {
        data.user_sex = this.formatSex(data.user_sex);
    }
    if (data.user_ltime) {
        data.user_ltime = this.formatDateByNow(data.user_ltime);
    }
    if (data.user_rtime) {
        data.user_rtime = this.formatDateByNow(data.user_rtime);
    }
    return data;
}
util.formatGoodsData = function (data) {
    data.goods_time = this.formatDate(data.goods_time);
    data.goods_type = this.formatType(data.goods_type);
    return data;
}
util.getSchool = function () {
    let school = [], j = 0;
    for (let val in schoolData) {
        let data = {};
        data['value'] = j ++;
        data['label'] = val;
        data['children'] = [];
        for (let i = 0; i < schoolData[val].length; i++) {
            data['children'].push({
                label: schoolData[val][i].name,
                value: schoolData[val][i].id
            });
        };
        school.push(data);
    }
    return school;
}
// 深度拷贝
util.cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
// 改变对象key值
util.setData = function (k, data) {
    let newData = {};
    for (let key in data) {
        newData[`${k}_${key}`] = data[key];
    }
    return newData;
}

export default util;