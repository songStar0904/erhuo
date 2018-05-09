<template>
	<AutoComplete
	    v-model="value"
	    @keyup.enter.native="toSearch(value)"
	    @on-select="toSearch"
	    @on-search="filterMethod"
	    icon="ios-search"
	    placeholder="请输出您想要的二货名称">
	    <Option v-for="item in data" :value="item.usearch_name" :key="item.usearch_name">
            <span class="">{{ item.usearch_name }}</span>
        </Option>
	</AutoComplete>
</template>
<script>
	export default{
		data () {
			return {
				data: [],
				nData:　[],
				value: ''
			}
		},
		created () {
			this.init();
		},
		methods: {
			init() {
				this.getData();
			},
			getData () {
				this.$fetch.main.get_usearch({
					num: 8
				}).then(res => {
					if (res.code === 200) {
						this.data = res.data;
						this.nData = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			del (id) {
				console.log(id);
			},
			toSearch (value) {
				this.value = value;
				this.$emit('toSearch', this.value);
			},
			filterMethod () {
				this.data = this.nData.filter((item) => {
					return item.usearch_name.toUpperCase().indexOf(this.value.toUpperCase()) !== -1;
				})
            }
		},
		watch: {
			isLogin () {
				this.init()
			}
		},
		computed: {
			isLogin () {
                if (this.$store.state.user.isLogin) {
                    return this.$store.state.user.isLogin;
                }
            }
		}
	}
</script>