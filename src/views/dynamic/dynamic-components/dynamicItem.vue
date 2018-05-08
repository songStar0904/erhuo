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
	<div>
		<my-card :info="dynamic.user" :time="dynamic.dynamic_time">
			<div slot="more">
				<Dropdown trigger="click" class="more fr" @on-click="onClick">
			        <a href="javascript:void(0)">
			            <Icon type="ios-more" style="font-size:20px;"></Icon>
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem name="0">举报</DropdownItem>
			            <DropdownItem name="1" v-if="uid === dynamic.user.id">删除</DropdownItem>
			        </DropdownMenu>
			    </Dropdown>
			</div>
			<div slot="content">
				<div class="ptb8">
					<span v-if="dynamic.dynamic_lid === 0" v-html="filterEmoji(dynamic.dynamic_content)">
					</span>
					<span  v-for="(item, index) in replaceUser(dynamic.dynamic_content)" v-else>
						<user-name :uid="item.user" v-if="item.user">
							<span slot="user" class="text-success"> @{{item.user}}: </span>
						</user-name>
						{{item.content}}
					</span>
				</div>
				<div v-if="dynamic.dynamic_type === 2 && dynamic.goods">
					<goods-uitem :data="dynamic.goods" :isOwn="uid === dynamic.goods.user.id"></goods-uitem>
				</div>
				<div v-if="dynamic.dynamic_lid !== 0">
					<dynamic-repost :dynamic="dynamic.children"></dynamic-repost>
				</div>
				<div class="btn-box text-sub">
					<div class="btn" @click="share">
						<Icon type="ios-undo-outline" size="16" class="mr5"></Icon><span v-if="dynamic.dynamic_share > 0">{{dynamic.dynamic_share}}</span><span v-else>分享</span>
					</div>
					<div class="btn" @click="openComment" :class="{'text-success': isOpen}">
						<Icon type="ios-chatbubble-outline"size="16" class="mr5"></Icon><span v-if="dynamic.comment_num > 0">{{dynamic.comment_num}}</span><span v-else="dynamic.comment_num === 0">评论</span>
					</div>
					<div class="btn" @click="praise" :class="{'text-error': dynamic.is_praise}">
						<Icon type="thumbsup"size="16" class="mr5"></Icon>
						<span v-if="dynamic.praise_num > 0">{{dynamic.praise_num}}</span>
						<span v-else>赞</span>
					</div>
				</div>
				<comment-box v-show="isOpen" :id="dynamic.dynamic_id" :lid="0" :rid="dynamic.user.id" type="dynamic" :data="this.comment"></comment-box>
			</div>
		</my-card>
	</div>
</template>
<script>
    import {myCard, userName} from '../../components/'
    import commentBox from '../../main-components/commentBox';
    import goodsUitem from '../../main-components/goods-uitem.vue';
    import dynamicRepost from './dynamicRepost.vue';
    import util from '../../../libs/util.js';
	export default {
		props: ['dynamic', 'index'],
		components: {
			myCard,
			commentBox,
			goodsUitem,
			dynamicRepost,
			userName
		},
		data () {
			return {
				isOpen: false,
				comment: [],
				shareContent: ''
			}
		},
		methods: {
			onClick (val) {
				if (val == 0) {
					this.$emit('openModal', 'report', this.dynamic.dynamic_id, this.index);
				} else if (val == 1) {
					this.$emit('openModal', 'del', this.dynamic.dynamic_id, this.index);
				}
			},
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
			share () {
				if (this.uid) {
					this.$emit('share', this.index);
				} else {
					this.$Message.error('请先登录');
				}
				
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
			},
			replaceUser (data) {
				return util.replaceUser(data);
			},
			filterEmoji (val) {
				return util.filterEmoji(val);
			}
		},
		computed: {
			uid () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info.user_id;
                }
            }
		}
	}
</script>
