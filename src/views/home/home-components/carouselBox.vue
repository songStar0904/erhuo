<style scoped>

.ivu-carousel-item img{
		height: 100%;
	}
</style>
<template>
    <Carousel autoplay v-model="value" :height="400" loop>
        <CarouselItem v-for="(item ,index) in data">
            <img :src="item.img" alt="" style="width:100%; height:100%">
        </CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value: 0,
                data: [{
                	img: 'http://ubookmallfile.b0.upaiyun.com/focus_img/focus_0.jpg'
                }, {
                	img: 'http://www.taoertao.com/upload/focus/upload_232438c62bef366f47b2e29ac44fdbda.png'
                }, {
                	img: 'http://ubookmallfile.b0.upaiyun.com/focus_img/focus_2.jpg'
                }]
            }
        }
    }
</script>