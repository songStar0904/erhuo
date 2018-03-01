<template>
	<Menu mode="horizontal" theme="light" :active-name="active" @on-select="changeMeau">
			<MenuItem v-for="item in meau" :name="item.name">
	            <Icon :type="item.icon"></Icon>
	            {{item.title}}
	        </MenuItem>
		</Menu>
</template>
<script>
	export default{
		props: ['meau'],
		methods: {
			changeMeau (name) {
            	this.$router.push({
                    name
                });
            }
		},
		computed: {
			active () {
            	return this.$route.name;
            }
		}
	}
</script>
