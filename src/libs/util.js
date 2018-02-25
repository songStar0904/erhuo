import axios from 'axios';
import env from '../config/env';
import schoolData from './school.js';

let util = {

};
util.title = function(title) {
    title = title ? title : '-二货-';
    window.document.title = title;
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
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
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

export default util;