<template>
	<Row :gutter="16">
        <Col span="12"><Button :type="is_fans ? 'warning' : 'success'" @click="follow" long>{{is_fans ? '取消关注': '关注 TA'}}</Button></Col>
        <Col span="12"><Button type="success" long>私信 TA</Button></Col>
    </Row>
</template>
<script>
	export default {
		props: ['info'],
		data () {
			return {}
		},
		computed: {
			is_fans () {
				return this.info.is_fans ? this.info.is_fans : false;
			}
		},
		methods: {
			follow () {
				this.$fetch.user.follow({
					followers_id: this.info.user_id
				}).then(res => {
					if (res.code === 200) {
						this.user.is_fans = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>