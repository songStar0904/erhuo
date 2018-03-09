<template>
	<Card :dis-hover="true" :padding="0">
		<Row type="flex" justify="space-between" class="code-row-bg">
	        <Col span="16">
	        	<Menu mode="horizontal" theme="light" :active-name="0" @on-select="changeMeau">
					<MenuItem :name="0">
			        	全部
			        </MenuItem>
			        <MenuItem :name="item.gclassify_id" v-for="(item, index) in classify" :key="index">
			        	{{item.gclassify_name}}
			        </MenuItem>
			    </Menu>
	        </Col>
	        <Col span="8" class="pr20">
	        	<Input v-model="search" style="margin-top: 14px;" >
		          <Button slot="append" icon="ios-search" @click="click_search"></Button>
		        </Input>
	        </Col>
	    </Row> 
	</Card>
</template>
<script>
	export default{
		data () {
			return {
				search: this.$route.query.search,
				cid: 0
			}
		},
		computed: {
			classify () {
				return this.$store.state.app.classify;
			}
		},
		methods: {
			click_search () {
				this.$router.push({
					name: 'discover',
					query: {
						search: this.search,
						cid: this.cid
					}
				})
			},
			changeMeau (name) {
				this.cid = name;
				this.$router.push({
					name: 'discover',
					query: {
						search: this.search,
						cid: this.cid
					}
				})
			}
		}
	}
</script>
