<template>
	<div class="box">
		<classify-box class="mb20"></classify-box>
		<goods-box :data="data"></goods-box>
		<no-goods v-show="data.length<=0"></no-goods>
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
				page: 1
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
		watch: {
			$route () {
				this.getData();
			}
		},
		methods: {
			getData () {
				this.$fetch.goods.get({
					page: this.page,
					cid: this.cid,
					search: this.search
				}).then(res => {
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
