<template>
	<div class="box">
		<classify-box class="mb20"></classify-box>
		<goods-box :data="data"></goods-box>
		<no-goods v-show="data.length<=0"></no-goods>
		<Spin size="large" fix v-if="loading"></Spin>
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
				page: 1,
				num: 8,
				loading: false
			}
		},
		computed: {
			cid () {
				return this.$route.query.cid;
			},
			search () {
				return this.$route.query.search
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
				this.loading = true;
				this.$fetch.goods.get({
					page: this.page,
					num: this.num,
					cid: this.cid,
					search: this.search
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
