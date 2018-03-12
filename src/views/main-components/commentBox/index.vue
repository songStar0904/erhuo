<template>
	<div>
		<comment-item v-for="(item, index) in data" :key="index" :comment="item"></comment-item>
	</div>
</template>
<script>
    import commentItem from './commentItem.vue';
	export default{
		components: {
			commentItem
		},
		props: ['data']
	}
</script>
