<style lang="less" scoped>
  @import "../../style/common.css";
</style>
<template>
	<layout :info="user_info">
		<div slot="leftInfo" style="font-size:14px;">
			<p>{{user_info.user_sex | formatSex}}</p>
        	<p>{{user_info.user_sid | formatSchool}}</p>
        	<p>{{user_info.user_ltime | formatDate}}</p>
        	<span class="text-success btn">关注 ({{user_info.user_rship.fans_num}})</span>  &nbsp; <span class="text-success btn">粉丝 ({{user_info.user_rship.followers_num}})</span>
		</div>
		<div slot="leftMeau">
			{{user_info.user_sign}}
		</div>
		<div slot="leftBottom">
			<Row :gutter="16">
		        <Col span="12"><Button :type="user_info.user_rship.is_fans ? 'warning' : 'success'" @click="follow" long>{{user_info.user_rship.is_fans ? '取消关注': '关注TA'}}</Button></Col>
		        <Col span="12"><Button type="success" long>私信TA</Button></Col>
		    </Row>
		</div>
		<user-meau slot="rightMeau" :meau="meau" style="margin-bottom:20px;"></user-meau>
	</layout>
</template>
<script>
import util from '../../libs/util.js';
import layout from '../layout/layout.vue';
import userMeau from '../user/user-components/userMeau.vue';
	export default{
		components: {
			layout,
			userMeau
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
		filters: {
	        formatSex (val) {
	            if (val === 'male') {
	                return '男生';
	            } else {
	                return '女生';
	            }
	        },
	        formatSchool (val) {
	        	if (val) {
	        		return util.formatSchool(val);
	        	}
	        },
	        formatDate (val) {
	            return util.formatDate(val);
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
            },
            follow () {
				this.$fetch.user.follow({
					user_id: this.uid,
					type: this.type,
					followers_id: this.user_id
				}).then(res => {
					if (res.code === 200) {
						this.user_info.user_rship.is_fans = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
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
