<style lang="less" scoped>
  @import "../../style/common.css";
</style>
<template>
	<layout :user_name="user_info.user_name" :user_icon="user_info.user_icon">
		<div slot="leftMeau" style="font-size:14px;">
			<p>{{user_info.user_sex | formatSex}}</p>
        	<p>{{user_info.user_sid | formatSchool}}</p>
        	<p>{{user_info.user_ltime | formatDate}}</p>
        	<span class="text-success btn">关注 ({{user_info.user_rship.fans_num}})</span>  &nbsp; <span class="text-success btn">粉丝 ({{user_info.user_rship.followers_num}})</span>
		</div>
		<div slot="leftBottom">
			<Card :dis-hover="true" style="margin:20px 0;">{{user_info.user_sign}}</Card>
			<Card :dis-hover="true">
				<Row type="flex" justify="center">
			        <Col span="12"><Button :type="user_info.user_rship.is_fans ? 'warning' : 'success'" @click="follow" long>{{user_info.user_rship.is_fans ? '取消关注': '关注TA'}}</Button></Col>
			        <Col span="12"><Button type="success" long>私信TA</Button></Col>
			    </Row>
			</Card>
		</div>
		<Menu mode="horizontal" theme="light" active-name="sell" slot="rightMeau" @on-select="changeMeau">
			<MenuItem name="sell">
	            <Icon type="ios-paper"></Icon>
	            出售
	        </MenuItem>
	        <MenuItem name="followers">
	            <Icon type="ios-paper"></Icon>
	            关注
	        </MenuItem>
	        <MenuItem name="fans">
	            <Icon type="ios-paper"></Icon>
	            粉丝
	        </MenuItem>
		</Menu>
	</layout>
</template>
<script>
import util from '../../libs/util.js';
import layout from '../layout/layout.vue';
	export default{
		components: {
			layout
		},
		data () {
			return {
				user_info: {
					user_rship: {
						followers_num: 0
					}
				}
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
