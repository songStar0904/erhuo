<style scoped>
</style>
<template>
	<Row :gutter="30"><!-- :xs="{ span: 10, offset: 1 }":md="{ span: 6, offset: 2 }" :lg="{ span: 4, offset: 2 }" -->
        <Col span="6" v-for="(item, index) in data" :key="index"><goods-hitem :data="item" ></goods-hitem></Col>
    </Row>
</template>
<script>
import goodsHitem from '../../main-components/goods-hitem.vue'
	export default {
		props: ['data'],
		components: {
			goodsHitem
		},
		data () {
			return {
			}
		}
	}
</script>