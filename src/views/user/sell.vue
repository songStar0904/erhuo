<template>
	<div>
		<Row type="flex" justify="end">
			<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
		</Row>
		<goods-uitem :data="item" v-for="item in data" style="margin: 20px 0"></goods-uitem>
		<div v-if="data.length==0" style="text-align:center">
			<p style="margin:50px 0;">您没有发布任何二货哦~</p>
			<Button type="success" @click="publish">现在发布</Button>
		</div>
		<Row type="flex" justify="end">
			<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
		</Row>
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
					return this.$store.state.user.info.user_id;
				}
			}
		},
		mounted () {
			this.getGoods();
		},
		methods: {
			getGoods () {
				this.$fetch.goods.get({
					uid: this.uid,
					search: this.search,
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
				this.getGoods();
			}
		}
	}
</script>
