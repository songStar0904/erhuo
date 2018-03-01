<style scoped>
</style>
<template>
	<Row>
        <Col :xs="{ span: 10, offset: 1 }" :md="{ span: 6, offset: 2 }" :lg="{ span: 4, offset: 2 }" v-for="item in data"><goods-hitem :data="item" ></goods-hitem></Col>
    </Row>
</template>
<script>
import goodsHitem from '../../main-components/goods-hitem.vue'
	export default {
		components: {
			goodsHitem
		},
		data () {
			return {
				data: []
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.$fetch.goods.get()
				.then(res => {
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