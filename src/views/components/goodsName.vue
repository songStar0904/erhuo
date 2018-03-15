<style scoped>
</style>
<template>
	<router-link :to="{ name: 'goods', params: { gid }}">
		<span class="text-success">{{name}}</span>
	</router-link>
</template>
<script>
	export default{
		props: ['gid', 'name']
	}
</script>
