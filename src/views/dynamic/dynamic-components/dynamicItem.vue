<style scoped>
	.btn-box{
		height: 25px;
		line-height: 48px;
	}
	.btn{
		display: inline-block;
	    width: 92px;
	}
	.btn:nth-child(3):hover{
		color: #ed3f14;
	}
</style>
<template>
	<my-card :info="dynamic.user" :time="dynamic.dynamic_time">
		<div slot="more">
			<Dropdown trigger="click" class="more fr" @on-click="onClick">
		        <a href="javascript:void(0)">
		            <Icon type="ios-more" style="font-size:20px;"></Icon>
		        </a>
		        <DropdownMenu slot="list">
		            <DropdownItem name="0">举报</DropdownItem>
		            <DropdownItem name="2">删除</DropdownItem>
		        </DropdownMenu>
		    </Dropdown>
		</div>
		<div slot="content">
			<p class="ptb5">{{dynamic.dynamic_content}}</p>
			<div class="btn-box text-sub">
				<div class="btn">
					<Icon type="ios-undo-outline" size="16" class="mr5"></Icon><span v-if="dynamic.dynamic_share > 0">{{dynamic.dynamic_share}}</span><span else>分享</span>
				</div>
				<div class="btn" @click="openComment" :class="{'text-success': isOpen}">
					<Icon type="ios-chatbubble-outline"size="16" class="mr5"></Icon><span v-if="dynamic.dynamic_share > 0">{{dynamic.dynamic_share}}</span><span else>评论</span>
				</div>
				<div class="btn" @click="praise" :class="{'text-error': dynamic.is_praise}">
					<Icon type="thumbsup"size="16" class="mr5"></Icon>
					<span v-show="dynamic.praise_num > 0">{{dynamic.praise_num}}</span>
					<span v-show="dynamic.praise_num === 0">赞</span>
				</div>
			</div>
			<comment-box v-show="isOpen" :id="dynamic.dynamic_id" :lid="0" :rid="dynamic.user.id" type="dynamic" :data="this.comment"></comment-box>
		</div>
	</my-card>
</template>
<script>
    import {myCard} from '../../components/'
    import commentBox from '../../main-components/commentBox';
	export default {
		props: ['dynamic'],
		components: {
			myCard,
			commentBox
		},
		data () {
			return {
				isOpen: false,
				comment: []
			}
		},
		methods: {
			onClick () {},
			praise () {
				this.$fetch.msg.praise({
					type: 1,
					mid: this.dynamic.dynamic_id
				}).then(res => {
					if (res.code === 200) {
						this.$Message.success(res.msg);
						let count = this.dynamic.is_praise ? -1 : 1;
						this.dynamic.praise_num += count;
						this.dynamic.is_praise = !this.dynamic.is_praise;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			openComment () {
				if (!this.isOpen) {
					this.getComment();
				}
				this.isOpen = !this.isOpen;
			},
			getComment () {
				this.$fetch.msg.get_by_id({
					type: 'dynamic',
					gid: this.dynamic.dynamic_id
				}).then(res => {
					if (res.code === 200) {
						this.comment = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
