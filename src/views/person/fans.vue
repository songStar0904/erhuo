<template>
	<Table border :columns="followersColumns" :data="data" style="margin-top: 30px;"></Table>
</template>
<script>
import {followersColumns} from '../table/columns_data.js';
	export default{
		data () {
			return {
				data: [],
			    followersColumns
			}
		},
		mounted () {
			this.get_followers();
		},
		watch: {
			$route () {
				this.get_followers();
			}
		},
		methods: {
			get_followers () {
				console.log(this.$route)
				this.$fetch.user.get_followers({
					user_id: this.$route.params.uid,
					type: this.$route.name
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>
