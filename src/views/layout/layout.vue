<style lang="less" scoped>
.user_name{
	font-size: 18px;
}
</style>
<template>
	<div class="box">
		<Row :gutter="40">
	        <Col span="7">
	        <user-info :info="info">
	        	<div slot="userInfo">
	        		<slot name="leftInfo"></slot>
	        	</div>
	        </user-info>
			<Card :dis-hover="true">
	        	<slot name="leftMeau"></slot>
			</Card>
			<Card :dis-hover="true" style="margin-top: 30px;">
	        	<slot name="leftBottom"></slot>
			</Card>
			
	        </Col>
	        <Col span="17">
	            <Card :padding="30">
	            	<slot name="rightMeau"></slot>
			        <router-view></router-view>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
import {userInfo} from '../main-components';
	export default {
        props: ['info'],
		components: {
            userInfo
        }
	}
</script>
