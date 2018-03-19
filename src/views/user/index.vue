<style lang="less" scoped>
  @import "./style/index.less";
</style>
<template>
	<layout :info="user_info">
		<div slot="leftInfo">
			<p style="color: #999;"><span>{{user_info.user_sid}}</span> | <span>{{user_info.user_sex}}</span></p>
			<Button type="success" icon="card" style="width:150px; margin-top:10px;">发布二货</Button>
		</div>
		<Menu :theme="'light'" :active-name="active" @on-select="changeMeau" slot="leftMeau" style="width: 246px;">
		        <MenuGroup title="我的二货">
		            <MenuItem name="usell">
		                <Icon type="bag"></Icon>
		                我发布的
		            </MenuItem>
		            <MenuItem name="ucollection">
		                <Icon type="ios-heart"></Icon>
		                我想要的
		            </MenuItem>
		        </MenuGroup>
		        <MenuGroup title="粉丝/关注">
		            <MenuItem name="ufans">
		                <Icon type="happy-outline"></Icon>
		                我的粉丝
		            </MenuItem>
		            <MenuItem name="ufollowers">
		                <Icon type="android-happy"></Icon>
		                我的关注
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
		    <my-meau slot="rightMeau" :meau="meau" v-show="isShow" style="margin-bottom:20px;" @changeMeau="changeMeau" :active="active"></my-meau>
	</layout>
</template>
<script>
    import layout from '../layout/layout.vue';
    import {myMeau} from '../components';
	export default{
		components: {
			layout,
			myMeau
		},
		data () {
			return {
				meau: [{
					name: 'usell',
					icon: 'bag',
					title: '出售'
				}, {
					name: 'ucollection',
					icon: 'bag',
					title: '收藏'
				}, {
					name: 'ufans',
					icon: 'happy-outline',
					title: '粉丝'
				}, {
					name: 'ufollowers',
					icon: 'android-happy',
					title: '关注'
				}]
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
            user_info () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info;
                }
            },
            active () {
            	return this.$route.name;
            },
            isShow () {
            	return this.meau.some((item) => {
					if (this.$route.name === item.name) {
						return true;
					}
				});
            }
        }
	}
</script>
