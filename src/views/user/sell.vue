<template>
	<div>
		<div v-if="data.length==0" style="text-align:center">
			<p style="margin:50px 0;">没有找到任何二货哦~</p>
			<Button type="success" @click="publish" v-if="user_id === uid && type === 'sell'">现在发布</Button>
		</div>
		<div v-else>
			<Row type="flex" justify="end">
				<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
			</Row>
			<goods-uitem :data="item" :isOwn="isOwn" v-for="(item, index) in data" :key="index" style="margin: 20px 0" @getGoods="getGoods"></goods-uitem>
			<Row type="flex" justify="end">
				<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
			</Row>
		</div>
	</div>
</template>
<script>
    import goodsUitem from '../main-components/goods-uitem.vue';
	export default {
		components: {
			goodsUitem
		},
		data () {
			return {
				data: [],
				page: 1,
				total: 0,
				num: 5
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
			}
		},
		watch: {
			type () {
				this.init();
			}
		},
		mounted () {
			this.init();
		},
		methods: {
			init () {
				if (this.type === 'sell') {
					this.getGoods();
				} else {
					this.get_followers();
				}
			},
			getGoods () {
				this.$fetch.goods.get({
					uid: this.uid,
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
			}
		}
	}
</script>
