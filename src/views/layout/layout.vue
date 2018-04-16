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
	        <Card :dis-hover="true" class="mb30">
		        <user-info :info="info" v-if="info">
		        	<div slot="userInfo">
		        		<slot name="leftInfo"></slot>
		        	</div>
		        </user-info>
		    </Card>
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
			        <router-view style="marigin-top: -20px;"></router-view>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
import {userInfo} from '../components';
	export default {
        props: ['info'],
		components: {
            userInfo
        }
	}
</script>
