<style scoped>
	.minH648{
		min-height: 648px;
	}
</style>
<template>
	<div class="box">
		<classify-box class="mb20" @changeMeau="changeMeau"></classify-box>
		<Row type="flex" justify="space-between" class="mb20">
			<Col span="12">
			    <span class="btn mr20 ml10" :class="{'text-success': sort === 'new'}" @click="changeSort('new')">最新</span>
			    <span class="btn" :class="{'text-success': sort === 'pop'}" @click="changeSort('pop')">最热</span>
			</Col>
			<div class="fr">
			    <CheckboxGroup v-model="tag" @on-change="changeTag">
			        <Checkbox label="spread">
			            <span>精品</span>
			        </Checkbox>
			        <Checkbox label="buy">
			            <span>求购</span>
			        </Checkbox>
			        <Checkbox label="sold">
			            <span>下架</span>
			        </Checkbox>
			    </CheckboxGroup>
		    </div>
		</Row>
		<div class="minH648">
			<goods-box :data="data"></goods-box>
		    <no-goods v-show="data.length <= 0 && loading === false"></no-goods>
		</div>
		<Spin size="large" fix v-if="loading"></Spin>
		<Row type="flex" justify="center" class="mt20">
		    <Page :total="total" show-total show-elevator @on-change="changePage" :current="page"></Page>
		</Row>
	</div>
</template>
<script>
	import {classifyBox, noGoods} from './discover-components/';
	import {goodsBox} from '../home/home-components/';
	export default {
		components: {
			classifyBox,
			goodsBox,
			noGoods
		},
		data () {
			return {
				data: [],
				total: 0,
				num: 8,
				loading: false,
				tag: [],
				sort: 'new'
			}
		},
		computed: {
			cid () {
				return Number(this.$route.query.cid) ? Number(this.$route.query.cid) : 0;
			},
			search () {
				return this.$route.query.search;
			},
			page () {
				return Number(this.$route.query.page) ? Number(this.$route.query.page) : 1;
			},
			spread () {
				return this.hasTag('spread');
			},
			sold () {
				return this.hasTag('sold');
			},
			buy () {
				return this.hasTag('buy');
			}
		},
		mounted () {
			this.getData();
		},
		watch: {
			$route () {
				this.getData();
			}
		},
		methods: {
			getData () {
				this.data = [];
				this.loading = true;
				this.$fetch.goods.get({
					page: this.page,
					num: this.num,
					cid: this.cid,
					search: this.search,
					sort: this.sort,
					spread: this.spread,
					sold: this.sold,
					buy: this.buy
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
			changeMeau (cid, search, page) {
				this.changeRouter(cid, search, page, this.sort);
			},
			changePage (val) {
				this.changeRouter(this.cid, this.search, val, this.sort);
			},
			changeSort (sort) {
				this.sort = sort;
				this.changePage(1);
			},
			changeTag (tag) {
				this.changePage(1);
			},
			hasTag (tag) {
				let tags = this.tag.join(',');
				return tags.indexOf(tag) === -1 ? 0 : 1;
			},
			changeRouter (cid, search, page, sort) {
				this.$router.push({
					name: 'discover',
					query: {
						search,
						cid,
						page,
						sort,
						spread: this.spread,
						sold: this.sold,
						buy: this.buy
					}
				})
			}
		}
	}
</script>
