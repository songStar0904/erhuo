<style lang="less" scoped>

</style>
<template>
	<layout :info="user_info">
        <div v-title>二货 - 消息中心</div>
		<div slot="leftInfo">
			<p style="color: #999;"><span>{{user_info.user_sid}}</span> | <span>{{user_info.user_sex}}</span></p>
            <router-link :to="{ name: 'publish'}" target="_blank">
			    <Button type="success" icon="card" style="width:150px; margin-top:10px;">发布二货</Button>
            </router-link>
		</div>
		<Menu :theme="'light'" :active-name="active" @on-select="changeMeau" slot="leftMeau" style="width: 246px;" class="message">
            <MenuItem name="notice">
                <Icon type="speakerphone"></Icon>
                通知
            </MenuItem>
            <MenuGroup title="@ 我的">
                <MenuItem name="l_comment">
                    <Badge count="3">
                    二货评论
                </Badge>
                </MenuItem>
                <MenuItem name="d_comment">
                    动态评论
                </MenuItem>
            </MenuGroup>
            <MenuItem name="letter">
                <Icon type="filing"></Icon>
                私信
            </MenuItem>
		</Menu>
		<my-meau v-show="isShow" slot="rightMeau" :meau="meau"  @changeMeau="changeMyMeau" :active="active1"></my-meau>
	</layout>
</template>
<script>
    import layout from '../layout/layout.vue';
    import {myMeau} from '../components/';
	export default{
		components: {
			layout,
			myMeau
		},
		data () {
			return {
				meau: [{
					name: '0',
					icon: 'bag',
					title: '未读'
				}, {
					name: '1',
					icon: 'happy-outline',
					title: '已读'
				}, {
					name: '2',
					icon: 'android-happy',
					title: '已回复'
				}]
			}
		},
		methods: {
            changeMeau (name) {
            	this.$router.push({
                    name
                });
            },
            changeMyMeau (name) {
            	this.$router.push({
                    query: {
                    	status: name
                    }
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
            active1 () {
            	if (!this.$route.query.status) {
            		this.$route.query.status = '0'
            	}
            	return String(this.$route.query.status);
            },
            isShow () {
                return this.active.slice(2) === 'comment' ? true : false;
            }
        }
	}
</script>
