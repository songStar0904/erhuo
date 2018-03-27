<template>
	<layout :info="user_info">
		<div slot="leftInfo" style="font-size:14px;" v-if="user_info">
				<p>{{user_info.user_sex}}</p>
	        	<p>{{user_info.user_sid}}</p>
	        	<span class="text-success btn">关注 ({{user_info.ship.fans_num}})</span>  &nbsp; <span class="text-success btn">粉丝 ({{user_info.ship.followers_num}})</span>
		</div>
		<div slot="leftMeau" style="text-align:center;" else>发表动态,请先登录</div>
		<div slot="rightMeau" style="padding-top:30px;">
			<input-box @submit="submit" :content="content" class="mb20" :rows="4" :placeholder="'有什么想和大家分享的？'"></input-box>
			<dynamic-item :dynamic="item" v-for="(item, index) in data" :key="index"></dynamic-item>
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
				data: []
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.dynamic.get({
					type: 0
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
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
						this.getData();
					} else {
						this.$Message.error(res.msg)
					}
				})
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