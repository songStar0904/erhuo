import axios from 'axios';
import env from '../config/env';
import schoolData from './school.js';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
util.formatSchool = function (school_id) {
    for (let val in schoolData) {
        for (let i = 0; i < schoolData[val].length; i++) {
            if (school_id === Number(schoolData[val][i].id)) {
                return schoolData[val][i].name;
            }
        }
    }
    return '未知';
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