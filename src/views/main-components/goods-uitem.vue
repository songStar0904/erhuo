<style scoped>
	.goods_name{
		padding-bottom: 8px; 
		border-bottom: 1px dotted #dddee1;
	}
	.oprice{
		color: rgb(185,185,185);
        text-decoration: line-through;
	}
</style>
<template>
	<Card :dis-hover="true">
		<Row :gutter="16">
        <Col span="8">
            <img :src="data.goods_icon[0]" :alt="data.goods_name" style="width:150px; height:160px;">
        </Col>
        <Col span="16">
            <h3 class="goods_name text-success">{{data.goods_name}}</h3>
            <Form :label-width="50">
            	<FormItem label="分类：">
	                 {{data.gclassify.name}}
	            </FormItem>
	        </Form>
	        <Form :label-width="50" inline>
            	<FormItem label="现价：">
	                 ￥{{data.goods_nprice}} 元
	            </FormItem>
	            <FormItem label="原价："class="oprice">
	                 ￥{{data.goods_oprice}} 元
	            </FormItem>
	        </Form>
	        <Button icon="heart" type="warning" style="margin-right:30px; width:60px;"></Button>
	        <Button icon="social-facebook" type="success" style="width:100px;">购买</Button>
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