<template>
	<div>
		<Spin fix size="large" v-if="loading"></Spin>
		<comment-item v-for="(item, index) in data" :key="index" :index="index" :comment="item" :type="type" @splice_msg="splice_msg" v-if="data.length>0"></comment-item>
		<div v-if="data.length === 0">
			暂时还没有消息
		</div>
	</div>
</template>
<script>
    import commentItem from './msg-components/commentItem.vue';
	export default{
		components: {
			commentItem
		},
		data () {
			return {
				data: [],
				loading: false
			}
		},
		watch: {
			$route () {
				this.getData()
			}
		},
		computed: {
			type () {
				return this.$route.meta.type;
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.loading = true;
				this.data = [];
				this.$fetch.msg.get({
					status: this.$route.query.status,
					type: this.type
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.data = res.data
					} else {
						this.$Message.error(res.msg)
					}
				})
			},
			splice_msg (index) {
				this.data.splice(index, 1);
			}
		}
	}
</script>