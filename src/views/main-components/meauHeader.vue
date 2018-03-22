<style scoped>
.layout-logo{
    width: 100px;
    height: 30px;
    background: #19be6b;
    color: #fff;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    text-align: center;
    line-height: 30px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-left: 80px;
    float: left;
}
.layout-login{
	float: right;
}
.ivu-menu-horizontal.ivu-menu-light:after{
	background: #fff;
}
.user_icon{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    top: 12px;
    left: -5px;
}
</style>
<template>
    <Menu mode="horizontal" theme="light" :active-name="active" @on-select="changeMenu">
        <div class="layout-logo">二 货</div>
        <div class="layout-nav">
            <MenuItem name="home">
                <Icon type="social-windows"></Icon>
                首页
            </MenuItem>
            <MenuItem name="discover">
                <Icon type="planet"></Icon>
                发现
            </MenuItem>
            <MenuItem name="publish">
                <Icon type="android-upload"></Icon>
                发布
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-navigate"></Icon>
                求购
            </MenuItem>
        </div>
        <div class="layout-login" v-if="isLogin">
            <message-tip v-model="count" class="fl"></message-tip>
            <Submenu name="3">
                <template slot="title">
                    <img :src="user_icon" alt="" class="user_icon">
                </template>
                    <MenuItem name="info">个人中心</MenuItem>
                    <MenuItem name="sell">我的二货</MenuItem>
                    <MenuItem name="loginOut">退出登录</MenuItem>
            </Submenu>
        </div>
        <div class="layout-login" v-else>
        	<MenuItem name="regist">
                注册
            </MenuItem>
            <MenuItem name="login">
                <Icon type="android-person"></Icon>
                登录
            </MenuItem>
        </div>
    </Menu>
</template>
<script>
import { mapState } from 'vuex';
import messageTip from './messageTip.vue';
	export default {
        components: {
            messageTip
        },
        data () {
            return {
            }
        },
        mounted () {
        },
        watch: {
            isLogin (val) {
                if (val) {
                    this.getMsg();
                    this.getnotice();
                }
            }
        },
		methods: {
			changeMenu (name) {
                if (name == 'loginOut') {
                    this.loginOut();
                } else {
                    this.$router.push({
                        name
                    });
                }
			},
            loginOut () {
                this.$fetch.user.loginOut()
                .then(res => {
                    if (res.code === 200) {
                        this.$store.commit('logout', this);
                        this.$router.push({
                            name: 'home'
                        });
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            getMsg () {
                this.$fetch.msg.get({
                    type: 'goods',
                    status: 0
                }).then(res => {
                    if (res.code === 200) {
                        this.$store.commit('setMsgCount', res.total);
                    }
                })
            },
            getnotice () {
                this.$fetch.msg.get_notice({
                    last_time: true
                }).then(res => {
                    if (res.code === 200) {
                        let data = res.data;
                        data.forEach((item, index) => {
                            setTimeout(() => {
                                this.$Notice.info({
                                    title: item.notice_title,
                                    desc: item.notice_content,
                                    duration: 5
                                });
                            }, 400 * index);
                        })
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
		},
        computed: {
            count () {
                return this.$store.state.app.msgCount;
            },
            isLogin () {
                if (this.$store.state.user.isLogin) {
                    return this.$store.state.user.isLogin;
                }
            },
            user_icon () {
                if (this.$store.state.user.info.user_icon) {
                    return this.$store.state.user.info.user_icon;
                }
            },
            active () {
                return this.$route.name ? this.$route.name : 'home';
            }
        }
	}
</script>
