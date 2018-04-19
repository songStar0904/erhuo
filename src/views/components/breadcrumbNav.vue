<template>
    <Breadcrumb>
        <BreadcrumbItem 
            v-for="item in currentPath" 
            :href="item.path" 
            :key="item.name"
        >{{ item.title }}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
export default {
    name: 'breadcrumbNav',
    computed: {
    	currentPath () {
    		return this.$store.state.app.currentPath;
    	}
    }
};
</script>

