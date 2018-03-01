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
	        <Card :dis-hover="true" style="padding:20px; background:#fff; text-align: center; margin-bottom:30px;">
	        	<Avatar :src="info.user_icon" class="large_icon"/>
	        	<h3 class="text-success btn user_name">{{info.user_name}}</h3>
	        	<slot name="leftInfo"></slot>
			</Card>
			<Card :dis-hover="true">
	        	<slot name="leftMeau"></slot>
			</Card>
			<Card :dis-hover="true" style="margin-top: 30px;">
	        	<slot name="leftBottom"></slot>
			</Card>
			
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
		props: ['info']
	}
</script>
