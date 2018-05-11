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
		.con{
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
			 - {{comment[`${key}_time`] | formatDate}}</p>
			<p class="text" v-html="filterEmoji(comment[`${key}_content`])"></p>
			<p class="clearfix">
				<span class="info fr">
					<span class="btn" v-show="report" @click="openReport"><Icon type="alert-circled" ></Icon> 举报</span>
					<span class="btn" @click="reply = true"><Icon type="chatbox-working"></Icon></span>
					<span class="btn" :class="{is_praise:comment.is_praise}" @click="praise(comment[`${key}_id`])"><span class="bp-icon-font icon-good"></span> {{comment.praise_num}}</span>
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
							</user-name> - {{item[`${key}_time`] | formatDate}}</p>
						<p class="text">
							<user-name :uid="item.suser.id">
							    <span slot="user">@{{item.ruser.name}}</span>
							</user-name>  <span v-html="filterEmoji(item[`${key}_content`])"></span></p>
					</div>
				</div>
			</div>
			<reply-box :placeholder="`回复 ${comment.suser.name}: `" :type="type" :id="id" :lid="comment[`${key}_id`]" :rid="comment.suser.id" v-show="reply" @updateMsg="updateMsg">
				<p slot="icon">&nbsp;</p>
				<Button type="text" slot="cancel" @click="reply = false">取消</Button>
			</reply-box>	
		</div>
		<report-modal :type="report_type" :id="comment[`${key}_id`]" ref="report"></report-modal>
	</div>
</template>
<script>
import {userName, reportModal} from '../../components';
import replyBox from './replyBox.vue';
import util from '../../../libs/util.js';
	export default{
		components: {
			userName,
			replyBox,
			reportModal
		},
		props: ['comment', 'id', 'type'],
		data () {
			return {
				report: false,
				reply: false,
				report_type: 2
			}
		},
		methods: {
			updateMsg () {
				this.$emit('updateMsg');
			},
			praise (mid) {
				let type = this.type === 'goods' ? 0 : 2;
				this.$fetch.msg.praise({
					type,
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
			},
			openReport () {
				this.$refs.report.openModal();
			},
			filterEmoji (val) {
				return util.filterEmoji(val);
			}
		},
		computed: {
			key () {
				if (this.type === 'goods') {
					this.report_type = 2;
					return 'lmsg';
				} else if (this.type === 'dynamic') {
					this.report_type = 4;
					return 'dmsg';
				}
			}
		}
	}
</script>