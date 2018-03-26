<style lang="less" scoped>
	.item{
		padding: 10px;
		.name{
			    font-size: 12px;
			    font-weight: 700;
			    line-height: 18px;
			    padding-bottom: 4px;
			    display: block;
			    word-wrap: break-word;
		}
		.user-face{
			float: left;
		}
		.con{
			position: relative;
			margin-left: 50px;
			padding-bottom: 10px;
			border-bottom: 1px solid #e9eaec;
			.text{
				padding: 4px 0;
			}
			.info{
				.btn{
					color: #99a2aa;
					margin: 0 10px;
				}
				.btn:nth-child(1):hover{
					color: #282828;
				}
				.btn:nth-child(2):hover{
					color: #ff9900;
				}
				.btn:nth-child(3):hover{
					color: #ed3f14;
				}
				.btn.is_praise{
					color: #ed3f14;
				}
			}
			.child{
				    margin-top: 16px;
				    margin-bottom: 20px;
				    padding: 16px 20px 20px;
				    background: #f4f4f4;
				    border-radius: 4px;
				    -webkit-border-radius: 4px;
				    -moz-border-radius: 4px;
				    position: relative;
				    font-size: 14px;
				.arrow{
					display: inline-block;
				    vertical-align: middle;
				    zoom: 1;
				    border-top: none;
				    border-right: 15px solid transparent;
				    border-bottom: 15px solid #f4f4f4;
				    border-left: 15px solid transparent;
				    position: absolute;
				    top: -12px;
				    left: 15px;
				}
				.con2{
					position: relative;
					margin-left: 40px;
				}
			}
		}
	}
	
</style>
<template>
	<div class="item" @mouseover="report = true" @mouseout="report = false">
		<span class="user-face">
			<user-name :uid="comment.suser.id">
				<Avatar slot="user" size="large" :src="comment.suser.icon" />
			</user-name>
		</span>
		<div class="con">
			<p class="name text-sub">
				<user-name :uid="comment.suser.id">
					<span slot="user">{{comment.suser.name}}</span>
				</user-name>
			 - {{comment.lmsg_time | formatDate}}</p>
			<p class="text">{{comment.lmsg_content}}</p>
			<p class="clearfix">
				<span class="info fr">
					<span class="btn" v-show="report"><Icon type="alert-circled" ></Icon> 举报</span>
					<span class="btn" @click="reply = true"><Icon type="chatbox-working"></Icon></span>
					<span class="btn" :class="{is_praise:comment.is_praise}" @click="praise(comment.lmsg_id)"><Icon type="thumbsup"></Icon> {{comment.praise_num}}</span>
				</span>
			</p>
			<div class="child" v-if="comment.children">
				<i class="arrow"></i>
				<div v-for="(item, index) in comment.children" :key="index" class="mt10">
					<span class="user-face">
						<user-name :uid="item.suser.id">
						  <Avatar slot="user" :src="item.suser.icon" />
						</user-name>
					</span>
					<div class="con2">
						<p class="name text-sub">
							<user-name :uid="item.suser.id">
								<span slot="user">{{item.suser.name}}</span>
							</user-name> - {{item.lmsg_time | formatDate}}</p>
						<p class="text">
							<user-name :uid="item.suser.id">
							    <span slot="user">@{{item.ruser.name}}</span>
							</user-name>  {{item.lmsg_content}}</p>
					</div>
				</div>
			</div>
			<reply-box :placeholder="`回复 ${comment.suser.name}: `" :type="'goods'" :id="id" :lid="comment.lmsg_id" :rid="comment.suser.id" v-show="reply" @updateMsg="updateMsg">
				<p slot="icon"></p>
				<Button type="text" slot="cancel" @click="reply = false">取消</Button>
			</reply-box>	
		</div>
	</div>
</template>
<script>
import util from '../../../libs/util.js';
import {userName} from '../../components';
import replyBox from './replyBox.vue';
	export default{
		components: {
			userName,
			replyBox
		},
		props: ['comment', 'id'],
		data () {
			return {
				report: false,
				reply: false
			}
		},
		filters: {
			formatDate (val) {
				return util.formatDateByNow(val);
			}
		},
		methods: {
			updateMsg () {
				this.$emit('updateMsg');
			},
			praise (mid) {
				this.$fetch.msg.praise({
					type: 0,
					mid
				}).then(res => {
					if (res.code === 200) {
						let count = this.comment.is_praise ? -1 : 1;
						this.comment.praise_num += count;
						this.comment.is_praise = !this.comment.is_praise;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>