<style scoped>
.rightMeau{
	position: relative;
    top: -30px;
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
			<slot name="leftBottom"></slot>	
	        </Col>
	        <Col span="17">
	            <Card :padding="30">
	            	<div class="rightMeau">
	                    <slot name="rightMeau"></slot>
	                </div>
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
