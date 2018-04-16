<template>
	<Card :dis-hover="true" >
		<p slot="title">{{title}}</p>
		<Row v-for="(item, index) in data" :key="index" style="margin: 5px 0" class="overflow">
			<Col span="18">
			<user-name :uid="item.user_id">
				<div slot="user">
					<Avatar :src="item.user_icon" /> {{item.user_name}}
				</div>
			</user-name>
			</Col>
			<Col span="4" style="line-height: 32px;">( {{item[order]}} )</Col>
		</Row>
	</Card>
</template>
<script>
import util from '../../../libs/util.js';
import {userName} from '../../components';
	export default{
		components: {
			userName
		},
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
			}
		}
	}
</script>
