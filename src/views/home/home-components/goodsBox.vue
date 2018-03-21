<style scoped>
.slide-fade-enter-to{
	opacity: 1;
	transform: translateY(0px);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter{
  transform: translateY(30px);
  opacity: 0;
}
</style>
<template>
	<Row :gutter="15"><!-- :xs="{ span: 10, offset: 1 }":md="{ span: 6, offset: 2 }" :lg="{ span: 4, offset: 2 }" -->
		<transition-group name="slide-fade">
        <Col span="6" v-for="(item, index) in data" :key="index">
		        <goods-hitem :data="item"></goods-hitem>
		 </Col>
		</transition-group>
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
		},
		mounted () {
		}
	}
</script>