<style scoped>
	.goods_name{
		padding-bottom: 8px; 
		border-bottom: 1px dotted #dddee1;
	}
	.oprice{
		color: rgb(185,185,185);
        text-decoration: line-through;
	}
	.mt10{
		margin-top: 10px;
	}
</style>
<template>
	<Card :dis-hover="true">
		<Row :gutter="16">
        <Col span="8">
            <img :src="data.goods_icon[0]" :alt="data.goods_name" style="width:145px; height:145px;">
        </Col>
        <Col span="16">
            <h3 class="goods_name text-success">{{data.goods_name}}</h3>
            <Row class="mt10">
		        <Col span="4">
		            <p>分类：</p>
		        </Col>
		        <Col span="6">
		            <p>{{data.gclassify.name}}</p>
		        </Col>
		    </Row>
            <Row class="mt10">
		        <Col span="4">
		            <p>现价：</p>
		        </Col>
		        <Col span="6">
		            <p>￥{{data.goods_nprice}} 元</p>
		        </Col>
		        <Col span="4">原价：</Col>
		        <Col span="6" class="oprice">￥{{data.goods_oprice}} 元</Col>
		    </Row>
	        <div style="margin-top:15px;">
	        	<Button icon="heart" type="warning" style="margin-right:30px; width:60px;"></Button>
	            <Button icon="social-facebook" type="success" style="width:100px;">购买</Button>
	        </div>
        </Col>
    </Row>
	</Card>
</template>
<script>
	export default {
		props: ['data'],
		data () {
			return {}
		},
	}
</script>