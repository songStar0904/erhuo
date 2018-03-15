<template>
	<div>
		<comment-item v-for="(item, index) in data" :key="index" :comment="item"></comment-item>
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
				status: this.$route
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.msg.get({
					status: this.status,
					type: 'goods'
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data
					} else {
						this.$Message.error(res.msg)
					}
				})
			}
		}
	}
</script>