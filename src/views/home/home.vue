<style scoped>
</style>
<template>
	<Content :style="{padding: '0 50px'}">
	    <carousel-box></carousel-box>
	    <search-box :style="{margin: '10px 0'}"></search-box>
	    <Card>
	        <div style="min-height: 200px;">
	            Content
	        </div>
	    </Card>
	</Content>
</template>
<script>
import {carouselBox, searchBox} from './home-components'
    export default {
    	components: {
    		carouselBox,
            searchBox
    	},
        methods: {
        }
    };
</script>