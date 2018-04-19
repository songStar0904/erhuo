<style scoped>
	.user_name:hover{
		color: #19be6b!important;
		position: relative;
	}
	.content{
		padding: 10px 0;
		width: 200px;
	}
</style>
<template>
	<Poptip trigger="hover" v-model="show" @on-popper-show="open">
	  <router-link class="user_name" :to="{ name: 'sell', params: { uid }}" target="_blank">
		<slot name="user"></slot>
	  </router-link>
	  <div slot="content" class="content">
	  	<user-card :info="info" :loading="loading"></user-card>
	  </div>
	</Poptip>
</template>
<script>
    import userCard from './userCard';
	export default{
		components: {
			userCard: userCard
		},
		props: ['uid'],
		data () {
			return {
				visible: false,
				loading: true,
				info: null,
				show: false
			}
		},
		methods: {
			open () {
				this.loading = true;
				this.show = true;
				this.$fetch.user.get_one({
					user: this.uid
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.info = res.data;
						this.uid = res.data.user_id;
					}
				})
			}
		}
	}
</script>
