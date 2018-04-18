<template>
	<Card :dis-hover="true" class="side_block">
		<p slot="title">{{title}}</p>
		<div class="content">
			<Spin size="large" fix v-if="loading"></Spin>
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
		</div>	
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
				data: [],
				loading: true,
				num: 8
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.loading = true;
				this.$fetch.user.get({
					order: this.order,
					num: this.num
				}).then(res => {
					this.loading = false;
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
