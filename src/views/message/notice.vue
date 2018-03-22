<style scoped>
.rightMeau{
	position: relative;
    top: -30px;
}
</style>
<template>
	<div>
		<Menu mode="horizontal" active-name="1" class="rightMeau">
	        <MenuItem name="1">
	            公告
	        </MenuItem>
	    </Menu>
	    <Spin fix size="large" v-if="loading"></Spin>
		<div v-if="data.length === 0">
			暂时还没有消息
		</div>
	    <notice-item v-for="(item, index) in data" :key="index" :notice="item"></notice-item>
	</div>
</template>
<script>
    import noticeItem from './msg-components/noticeItem.vue';
	export default {
		components: {
			noticeItem
		},
		data () {
			return {
				data: [],
				loading: false
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.loading = true;
				this.$fetch.msg.get_notice().then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
