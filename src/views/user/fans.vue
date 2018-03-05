<template>
	<div>
		<my-table :data="data" :columns="followersColumns" :loading="loading" @setPage="setPage" :total="total" pageSize="small"></my-table>
		
	</div>
</template>
<script>
import {followersColumns} from '../table/columns_data.js';
import myTable from '../table/my_table.vue';
const followBtn = (vm, h, params) => {
    return h('Button', {
            props: {
                type: params.row.is_fans ? 'warning' : 'primary',
                size: 'small'
            },
            style: {
                marginRight: '2px'
            },
            on: {
                click: () => {
                    vm.follow(params)
                }
            }
        }, params.row.is_fans ? '取消关注' : '关注TA');
};
const seeBtn = (vm, h, params) => {
    return h('Button', {
            props: {
                type: 'error',
                size: 'small'
            },
            on: {
                click: () => {
                    vm.see(params)
                }
            }
        }, '查看TA');
};

	export default{
		components: {
			myTable
		},
		data () {
			return {
				data: [],
			    followersColumns,
			    loading: false,
			    page: 1,
			    total: 0
			}
		},
		computed: {
			uid () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info.user_id;
                }
            },
            type () {
            	return this.$route.meta.type;
            },
            user_id () {
            	if (this.$route.params.uid) {
            		return this.$route.params.uid;
            	} else {
            		return this.uid;
            	}
            }
		},
		created () {
	        this.init();
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
			init () {
				this.followersColumns.forEach((item) => {
					if (item.handle){
						item.render = (h, param) => {
	                        let children = [];
	                        item.handle.forEach(item => {
	                            if (item === 'follow') {
	                                children.push(followBtn(this, h, param));
	                            } else if (item === 'see') {
	                                children.push(seeBtn(this, h, param));
	                            }
	                        });
	                        return h('div', children);
	                    };
					}
				})
			},
			setPage (val) {
				this.page = val;
			},
			get_followers () {
				this.loading = true;
				this.$fetch.user.get_followers({
					uid: this.uid,
					user_id: this.user_id,
					type: this.type,
					page: this.page
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.data = res.data;
						this.total = res.total;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			follow (val) {
				console.log(val);
				this.$fetch.user.follow({
					user_id: this.user_id,
					type: this.type,
					followers_id: val.row.user_id
				}).then(res => {
					if (res.code === 200) {
						this.data[val.index].is_fans = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			see (val) {
				console.log(val.row)
				this.$router.push({
					name: 'sell',
					params: {
						uid: val.row.user_id
					}
				})
			}
		}
	}
</script>
