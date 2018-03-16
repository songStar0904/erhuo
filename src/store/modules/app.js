
const user = {
    state: {classify: [], msgCount: 0},
    mutations: {
        setClassify (state, data) {
        	state.classify = data;
        },
        setMsgCount (state, data) {
        	state.msgCount = data;
        },
        changeMsgCount (state, data) {
            state.msgCount = state.msgCount + data;
        }
    },
    getters: {
    }
};

export default user;
