<style scoped>
</style>
<template>
	<Content :style="{padding: '0 50px'}">
	    <carousel-box></carousel-box>
	    <search-box :style="{margin: '20px 0'}"></search-box>
	    <Row :gutter="15">
	    	<Col span="6">
	    	    <side-block title="最近登录" order="user_ltime" class="mb20"></side-block>
	    	    <side-block title="最近注册" order="user_rtime" class="mb20"></side-block>
	        </Col>
	    	<Col span="18">商品</Col>
	    </Row>	
	</Content>
</template>
<script>
import {carouselBox, searchBox, sideBlock} from './home-components'
    export default {
    	components: {
    		carouselBox,
            searchBox,
            sideBlock
    	},
        methods: {
        }
    };
</script>