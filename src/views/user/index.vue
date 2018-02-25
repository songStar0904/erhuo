<style lang="less" scoped>
  @import "../../style/common.css";
  @import "./style/index.less";
</style>
<template>
	<div class="box">
		<Row :gutter="50">
	        <Col span="8">
	        <div style="padding:20px; background:#fff;">
	        	<div class="user_icon">
	        		<img :src="user_info.user_icon" alt="">
	        	</div>
	        	<span class="text-success btn user_name">{{user_info.user_name}}</span>
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
			        <MenuGroup title="内容管理">
			            <MenuItem name="1">
			                <Icon type="document-text"></Icon>
			                我发布的
			            </MenuItem>
			            <MenuItem name="2">
			                <Icon type="chatbubbles"></Icon>
			                我想要的
			            </MenuItem>
			        </MenuGroup>
			        <MenuGroup title="统计分析">
			            <MenuItem name="3">
			                <Icon type="heart"></Icon>
			                我的留言
			            </MenuItem>
			            <MenuItem name="4">
			                <Icon type="heart-broken"></Icon>
			                个人信息
			            </MenuItem>
			            <MenuItem name="4">
			                <Icon type="heart-broken"></Icon>
			                实名认证
			            </MenuItem>
			            <MenuItem name="fmsg">
			                <Icon type="ios-help-outline"></Icon>
			                意见反馈
			            </MenuItem>
			        </MenuGroup>
			    </Menu>
			</div>
	        </Col>
	        <Col span="16">
	            <Card :padding="30">
			        <router-view></router-view>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
	export default{
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
            	console.log(name);
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
