<style scoped>
	.meau{
		position: relative;
		top: -30px;
	}
</style>
<template>
	<data-box :data="data" :num="num" :page="page" :total="total" :loading="loading" @changePage="changePage" :meau="meau" @changeMeau="changeMeau" :noDataTitle="noDataTitle">
		<goods-uitem slot="dataItem" :data="item" :isOwn="isOwn" v-for="(item, index) in data" :key="index" style="margin: 20px 0" @getGoods="getGoods"></goods-uitem>
		<router-link slot="noDataBtn" :to="{ name: 'publish'}" target="_blank">
		    <Button type="success" icon="card" style="width:150px; margin-top:10px;">发布二货</Button>
		</router-link>
	</data-box>
</template>
<script>
    import goodsUitem from '../main-components/goods-uitem.vue';
    import {myMeau} from '../components';
    import dataBox from './user-components/dataBox.vue';
	export default {
		components: {
			goodsUitem,
			myMeau,
			dataBox
		},
		data () {
			return {
				data: [],
				page: 1,
				total: 0,
				num: 5,
				t_meau: [{
					name: 0,
					title: '全部'
				}, {
					name: 2,
					title: '出售'
				}, {
					name: 1,
					title: '未过审'
				}, {
					name: 3,
					title: '已下架'
				}],
				noDataTitle: '没有找到相关二货o_O',
				meau: [],
				status: 0,
				loading: false
			}
		},
		computed: {
			uid () {
				if (this.$route.params.uid) {
					return this.$route.params.uid
				} else {
					return this.user_id;
				}
			},
			user_id () {
				if (this.$store.state.user.info) {
					return this.$store.state.user.info.user_id;
				}
			},
			isOwn () {
				return this.user_id === this.uid ? true : false;
			},
			type () {
				return this.$route.meta.type;
			},
			showMeau () {
				return this.$route.meta.showMeau;
			}
		},
		watch: {
			type () {
				this.init();
			},
			showMeau (val) {
				this.initMeau();
			},
			data () {
				if (this.data.length <= 0 && this.page > 1) {
					this.page --;
				}
			}
		},
		mounted () {
			this.initMeau();
			this.init();
		},
		methods: {
			init () {
				if (this.type === 'sell' || this.type === 'usell') {
					this.getGoods();
				} else {
					this.get_followers();
				}
			},
			getGoods () {
				this.loading = true;
				this.$fetch.goods.get({
					uid: this.uid,
					page: this.page,
					num: this.num,
					goods_status: this.active
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.data = res.data;
						this.total = res.total;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			get_followers () {
				this.$fetch.goods.get_followers({
					user_id: this.uid,
					page: this.page
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
						this.total = res.total;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			publish () {
				this.$router.push({
					name: 'publish'
				})
			},
			changePage (val) {
				this.page = val;
				this.init();
			},
			changeMeau (active) {
				this.active = active;
				this.getGoods();
			},
			initMeau () {
				if (this.showMeau) {
					this.meau = this.t_meau;
				} else {
					this.meau = [];
				}
			}
		}
	}
</script>
