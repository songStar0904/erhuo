<template>
	<Card :dis-hover="true" >
		<p slot="title">{{title}}</p>
		<Row v-for="(item, index) in data" :key="index" style="margin: 5px 0">
			<Col span="4"><Avatar :src="item.user_icon" /></Col>
			<Col span="18" style="line-height: 32px;" class="btn overflow"><span  @click="toPerson(item.user_id)">{{item.user_name}} ( {{item[order]}} )</span></Col>
		</Row>
	</Card>
</template>
<script>
import util from '../../../libs/util.js';
	export default{
		props: ['title', 'order'],
		data () {
			return {
				data: []
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.user.get({
					order: this.order,
					num: 8
				}).then(res => {
					if (res.code === 200) {
						res.data.forEach(item => {
							item = util.formatUserData(item);
						})
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			toPerson (uid) {
				this.$router.push({
					name: 'sell',
					params: {
						uid
					}
				})
			}
		}
	}
</script>
