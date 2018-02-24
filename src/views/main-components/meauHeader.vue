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
        <div class="layout-login">
        	<MenuItem name="regist">
                注册
            </MenuItem>
            <MenuItem name="6">
                <Icon type="android-person"></Icon>
                登录
            </MenuItem>
        </div>
    </Menu>
</template>
<script>
	export default{
		methods: {
			changeMenu (name) {
				this.$router.push({
                    name
                });
			}
		}
	}
</script>