<template>
	<div class="box">
		<Row :gutter="50">
			<Col span="17">
				<goods-box :data="data" @updateFansNum="updateFansNum"></goods-box>
			</Col>
			<Col span="7">
				<user-info :info="info">
					<div slot="userInfo">
						<p style="color: #999;" class="mb10"><span>{{info.user_sid}}</span> | <span>{{info.user_sex}}</span></p>
						<fol-send :is_fans="info.user_is_fans" :uid="info.user_id" size="small" @updateFans="updateFans"></fol-send>
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
				data: {
					user: {
						id: 1
					}
				},
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
						this.info = util.formatUserData(util.setData('user', this.data.user));
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
