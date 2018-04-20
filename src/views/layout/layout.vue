
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
	            <Card :dis-hover="true" class="mb20">
	        	    <breadcrumb-nav></breadcrumb-nav>
	            </Card>	
	            <Card :padding="0" :dis-hover="true">
	            	<slot name="rightMeau"></slot>
	                <transition name="slide-fade">
				        <router-view style="padding: 30px;"></router-view>
				    </transition>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
import {userInfo, breadcrumbNav} from '../components';
	export default {
        props: ['info'],
		components: {
            userInfo,
            breadcrumbNav
        },
        computed: {
        	title () {
        		return this.$route.meta.title;
        	}
        }
	}
</script>
