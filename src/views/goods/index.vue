<template>
	<div class="box">
		<Row :gutter="50">
			<Col span="16">
				<goods-box :data="data"></goods-box>
			</Col>
			<Col span="8">
				<user-info :info="info">
					<div slot="userInfo">
						<fol-send :info="info"></fol-send>
					</div>
				</user-info>
				<dash-board :view="data.goods_view" :fans_num="data.fans_num" :msg_num="10" class="mb30"></dash-board>
				<user-sell :uid="data.user.id"></user-sell>
			</Col>
		</Row>
	</div>
</template>
<script>
    import {userInfo, folSend} from '../main-components';
    import goodsBox from './goods-components/goodsBox.vue';
    import dashBoard from './goods-components/dashBoard.vue';
    import userSell from './goods-components/userSell.vue';
    import util from '../../libs/util.js';
	export default{
		components: {
			userInfo,
			folSend,
			goodsBox,
			dashBoard,
			userSell
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
						this.data = util.formatGoodsData(res.data);
						this.info = util.setData('user', this.data.user);
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
