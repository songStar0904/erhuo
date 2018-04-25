<template>
	<div class="box" v-if="show">
		<div v-title>二货 - {{data.goods_name}}</div>
		<Row :gutter="50">
			<Col span="17">
				<goods-box :data="data" @updateFansNum="updateFansNum"></goods-box>
			</Col>
			<Col span="7">
				<Card :dis-hover="true" class="mb30">
					<user-card :info="info" :loading="false"></user-card>
				</Card>
				<dash-board :view="data.goods_view" :fans_num="data.fans_num" :msg_num="10" class="mb30"></dash-board>
				<user-sell :uid="info.user_id"></user-sell>
			</Col>
		</Row>
	</div>
</template>
<script>
    import {userCard, folSend} from '../components';
    import goodsBox from './goods-components/goodsBox.vue';
    import dashBoard from './goods-components/dashBoard.vue';
    import userSell from './goods-components/userSell.vue';
    import util from '../../libs/util.js';
	export default{
		components: {
			userCard,
			folSend,
			goodsBox,
			dashBoard,
			userSell
		},
		data () {
			return {
				data: null,
				info: {},
				show: false
			}
		},
		created () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.goods.get_one({
					goods_id: this.$route.params.gid
				}).then(res => {
					if (res.code === 200) {
						this.data = util.formatGoodsData(res.data);
						this.info = util.formatUserData(util.setData('user', this.data.user));
						this.show = true;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			updateFansNum (val) {
				let count = val ? 1 : -1;
				this.data.fans_num = this.data.fans_num + count;
			},
			updateFans (val) {
				this.info.user_is_fans = val;
			}
		}
	}
</script>
