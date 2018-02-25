<style lang="less" scoped>
@import "../../style/common.css";
.user_name{
	font-size: 18px;
}
</style>
<template>
	<div class="box">
		<Row :gutter="50">
	        <Col span="8">
	        <Card :dis-hover="true" style="padding:20px; background:#fff; text-align: center;">
	        	<Avatar :src="user_icon" class="large_icon"/>
	        	<span class="text-success btn user_name">{{user_name}}</span>
	        	<slot name="leftMeau"></slot>
			</Card>
			<slot name="leftBottom"></slot>	
	        </Col>
	        <Col span="16">
	            <Card :padding="30">
	            	<slot name="rightMeau"></slot>
			        <router-view></router-view>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
	export default {
		props: ['user_name', 'user_icon']
	}
</script>
