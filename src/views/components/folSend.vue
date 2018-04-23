<style>
	.p10{
		padding: 0 20px !important;
	}
</style>
<template>
	<Row>
        <Col span="12" class="p10"><Button :type="is_fans ? 'warning' : 'success'" @click="follow" :size="size" long>{{is_fans ? '取消关注': '关注 TA'}}</Button></Col>
        <Col span="12" class="p10"><Button type="success" :size="size" long>私信 TA</Button></Col>
    </Row>
</template>
<script>
	export default {
		props: ['uid', 'is_fans', 'size'],
		mounted () {
		},
		watch: {
			is_fans (val) {
				console.log(val)
			}
		},
		methods: {
			follow () {
				this.$fetch.user.follow({
					followers_id: this.uid
				}).then(res => {
					if (res.code === 200) {
						this.$emit('updateFans', res.data);
						console.log(res.data)
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>