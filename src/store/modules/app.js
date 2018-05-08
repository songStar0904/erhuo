import routers from '../../router/router';
const user = {
    state: {
        classify: [],
        msgCount: 0,
        routers: [
            ...routers
        ],
        beforePath: '/home',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home'
            }
        ], // 面包屑数组
    },
    mutations: {
        setClassify (state, data) {
        	state.classify = data;
        },
        setMsgCount (state, data) {
        	state.msgCount = data;
        },
        changeMsgCount (state, data) {
            state.msgCount = state.msgCount + data;
        }, 
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setBeforePath (state, path) {
            if (path !== '/regist') {
                state.beforePath = path;
            }
        }
    },
    getters: {
    }
};

export default user;
