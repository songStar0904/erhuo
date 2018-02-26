<style lang="less" scoped>
  @import "../../style/common.css";
  @import "./style/index.less";
</style>
<template>
	<layout :user_name="user_info.user_name" :user_icon="user_info.user_icon">
		<div slot="leftMeau">
			<Row :gutter="16" style="padding:20px 0">
		        <Col span="8">
		            <Button :type="btn_type('user_access')" shape="circle" icon="card" size="small"></Button>
		        </Col>
		        <Col span="8">
		            <Button :type="btn_type('user_phone')" shape="circle" icon="android-phone-portrait" size="small"></Button>
		        </Col>
		        <Col span="8">
		            <Button :type="btn_type('user_email')" shape="circle" icon="ios-email-outline" size="small"></Button>
		        </Col>
		    </Row>
            <Menu :theme="'light'" active-name="1" @on-select="changeMeau">
		        <MenuGroup title="我的二货">
		            <MenuItem name="1">
		                <Icon type="ios-compose"></Icon>
		                我发布的
		            </MenuItem>
		            <MenuItem name="2">
		                <Icon type="ios-heart"></Icon>
		                我想要的
		            </MenuItem>
		        </MenuGroup>
		        <MenuGroup title="个人中心">
		            <MenuItem name="3">
		                <Icon type="android-textsms"></Icon>
		                我的留言
		            </MenuItem>
		            <MenuItem name="info">
		                <Icon type="android-person"></Icon>
		                个人信息
		            </MenuItem>
		            <MenuItem name="4">
		                <Icon type="ribbon-b"></Icon>
		                实名认证
		            </MenuItem>
		            <MenuItem name="fmsg">
		                <Icon type="ios-help-outline"></Icon>
		                意见反馈
		            </MenuItem>
		        </MenuGroup>
		    </Menu>
		</div>
	</layout>
</template>
<script>
    import layout from '../layout/layout.vue';
	export default{
		components: {
			layout
		},
		data () {
			return {
			}
		},
		methods: {
			btn_type (val) {
            	if (this.user_info && this.user_info[val]){
            		return 'error';
            	} else {
            		return 'ghost';
            	}
            },
            changeMeau (name) {
            	this.$router.push({
                    name
                });
            }
		},
		computed: {
            isLogin () {
                return this.$store.getters.isLogin;
            },
            user_info () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info;
                }
            }
        }
	}
</script>
