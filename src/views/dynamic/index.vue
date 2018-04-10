<template>
	<layout :info="user_info">
		<div slot="leftInfo" style="font-size:14px;" v-if="user_info">
				<p>{{user_info.user_sex}}</p>
	        	<p>{{user_info.user_sid}}</p>
	        	<span class="text-success btn">关注 ({{user_info.ship.fans_num}})</span>  &nbsp; <span class="text-success btn">粉丝 ({{user_info.ship.followers_num}})</span>
		</div>
		<div slot="leftMeau" style="text-align:center;" v-else>发表动态,请先登录</div>
		<div slot="rightMeau" style="padding-top:30px; height: 100%;" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
			<input-box @submit="submit" :content="content" class="mb20" :rows="4" :placeholder="'有什么想和大家分享的？'"></input-box>
			<transition-group name="slide-fade">
			    <dynamic-item :dynamic="item" v-for="(item, index) in data" :key="index" :index="index" @delItem="delItem"></dynamic-item>
			</transition-group>
			<div v-if="noMore">
    			<Spin>
	                <div>没有更多了</div>
	            </Spin>
    		</div>
    		<div v-else>
    			<Spin>
	                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
	                <div>Loading</div>
	            </Spin>
    		</div>
		</div>
	</layout>
</template>
<script>
    import layout from '../layout/layout.vue';
    import {inputBox} from '../components';
    import dynamicItem from './dynamic-components/dynamicItem.vue';
	export default{
		components: {
			layout,
			inputBox,
			dynamicItem
		},
		data () {
			return {
				content: '',
				data: [],
				page: 1,
				num: 5,
				noMore: false,
				busy: false
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				console.log(this.page);
				this.busy = true;
				this.$fetch.dynamic.get({
					type: 0,
					num: this.num,
					page: this.page
				}).then(res => {
					this.busy = false;
					if (res.code === 200) {
						if (res.data.length > 0) {
							this.data.push(...res.data);
						} else {
							this.noMore = true;
						}
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			loadMore () {
				if (!this.noMore) {
					this.page ++;
				    this.getData();
				}
			},
			submit (val) {
				this.content = val;
				this.$fetch.dynamic.add({
					content: this.content,
					type: 0
				}).then(res => {
					if (res.code === 200) {
						this.content = '';
						this.$Message.success(res.msg);
						this.data.unshift(res.data);
					} else {
						this.$Message.error(res.msg)
					}
				})
			},
			delItem (index) {
				this.data.splice(index, 1);
			}
		},
		computed: {
			user_info () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info;
                }
            }
		}
	}
</script>