<style lang="less" scoped>
</style>
<template>
	<layout :info="user_info">
		<div slot="leftInfo" style="font-size:14px;">
			<p>{{user_info.user_sex}}</p>
        	<p>{{user_info.user_sid}}</p>
        	<p>{{user_info.user_ltime}}</p>
        	<span class="text-success btn">关注 ({{user_info.user_rship.fans_num}})</span>  &nbsp; <span class="text-success btn">粉丝 ({{user_info.user_rship.followers_num}})</span>
		</div>
		<div slot="leftMeau">
			<span v-if="user_info.user_sign.length>0">{{user_info.user_sign}}</span>
			<span v-else>这个人很懒，啥都没有要说。</span>
		</div>
		<div slot="leftBottom">
			<fol-send :info="user_info" size="default"></fol-send>
		</div>
		<user-meau slot="rightMeau" :meau="meau" style="margin-bottom:20px;"></user-meau>
	</layout>
</template>
<script>
import util from '../../libs/util.js';
import layout from '../layout/layout.vue';
import userMeau from '../user/user-components/userMeau.vue';
import {folSend} from '../main-components';
	export default{
		components: {
			layout,
			userMeau,
			folSend
		},
		data () {
			return {
				user_info: {
					user_rship: {
						followers_num: 0
					}
				},
				meau: [{
					name: 'sell',
					icon: 'bag',
					title: '出售'
				}, {
					name: 'fans',
					icon: 'happy-outline',
					title: '粉丝'
				}, {
					name: 'followers',
					icon: 'android-happy',
					title: '关注'
				}]
			}
		},
		watch: {
			user_id () {
				this.get_user();
			}
		},
		created () {
			this.get_user();
		},
		methods: {
			get_user () {
				this.$fetch.user.get_one({
					uid: this.uid,
					user_id: this.user_id
				}).then(res => {
					if (res.code === 200) {
						this.user_info = res.data;
					} else {
						this.$Message.error(res.msg)
					}
				})
			},
            changeMeau (name) {
            	this.$router.push({
                    name
                });
            }
		},
		computed: {
			uid () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info.user_id;
                }
            },
            user_id () {
            	return this.$route.params.uid;
            }
        }
	}
</script>
