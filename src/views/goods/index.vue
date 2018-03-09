<template>
	<div class="box">
		<Row :gutter="50">
			<Col span="16">{{data}}</Col>
			<Col span="8">
				<user-info :info="info">
					<div slot="userInfo">
						<fol-send :info="info"></fol-send>
					</div>
				</user-info>
			</Col>
		</Row>
	</div>
</template>
<script>
    import {userInfo, folSend} from '../main-components';
    import util from '../../libs/util.js';
	export default{
		components: {
			userInfo,
			folSend
		},
		data () {
			return {
				data: {},
				info: {}
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.goods.get_one({
					goods_id: this.$route.params.gid
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
						this.info = util.setData('user', this.data.user);
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
