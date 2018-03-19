<style scoped>
</style>
<template>
	<Content style="padding: 0 50px">
	    <carousel-box></carousel-box>
	    <search-box :style="{margin: '20px 0'}"></search-box>
	    <Row :gutter="15">
	    	<Col span="5">
	    	    <side-block title="人气用户" order="user_pop" class="mb20"></side-block>
	    	    <side-block title="最近登录" order="user_ltime" class="mb20"></side-block>
	    	    <side-block title="最近注册" order="user_rtime" class="mb20"></side-block>
	        </Col>
	    	<Col span="19">
	    		<goods-box :data="data"></goods-box>
	    	</Col>
	    </Row>	
	</Content>
</template>
<script>
import {carouselBox, sideBlock, goodsBox} from './home-components';
import {searchBox} from '../main-components';
    export default {
    	components: {
    		carouselBox,
            searchBox,
            sideBlock,
            goodsBox
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
				this.$fetch.goods.get({
					num: 8
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
        }
    };
</script>