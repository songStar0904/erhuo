<style scoped>
	.user_name:hover{
		color: #19be6b!important;
	}
</style>
<template>
	<router-link class="user_name" :to="{ name: 'sell', params: { uid }}">
		<slot name="user"></slot>
	</router-link>
</template>
<script>
	export default{
		props: ['uid']
	}
</script>
