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
    <Menu mode="horizontal" theme="light" active-name="home" @on-select="changeMenu">
        <div class="layout-logo">二 货</div>
        <div class="layout-nav">
            <MenuItem name="home">
                <Icon type="ios-navigate"></Icon>
                首页
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                Item 2
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                Item 3
            </MenuItem>
            <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                Item 4
            </MenuItem>
        </div>
        <div class="layout-login" v-if="isLogin">
            <Submenu name="3">
                <template slot="title">
                    <img :src="user_icon" alt="" class="user_icon">
                </template>
                    <MenuItem name="user">个人中心</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">退出登录</MenuItem>
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
	export default {
		methods: {
			changeMenu (name) {
				this.$router.push({
                    name
                });
			}
		},
        computed: {
            isLogin () {
                return this.$store.getters.isLogin;
            },
            user_icon () {
                if (this.$store.state.user.info.user_icon) {
                    return this.$store.state.user.info.user_icon;
                }
            }
        }
	}
</script>
