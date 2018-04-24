<template>
	<data-box :data="dynamic" :num="num" :page="page" :total="total" :loading="loading" @changePage="changePage" :meau="meau" @changeMeau="changeMeau" :noDataTitle="noDataTitle">
		<dynamic-item slot="dataItem" v-for="(item, index) in dynamic" :key="index" :dynamic="item" :index="index" v-if="dynamic.length > 0"></dynamic-item>
	</data-box>
</template>
<script>
    import dynamicItem from '../dynamic/dynamic-components/dynamicItem.vue';
    import dataBox from './user-components/dataBox.vue';
	export default{
		components: {
			dynamicItem,
			dataBox
		},
		data () {
			return {
				dynamic: [],
				page: 1,
				num: 5,
				type: 0,
				total: 0,
				loading: false,
				noDataTitle: '没有找到相关动态:-O',
				meau: [],
				t_meau: [{
					name: 0,
					title: '全部'
				}, {
					name: 1,
					title: '文字'
				}, {
					name: 2,
					title: '二货'
				}, {
					name: 3,
					title: '粉丝'
				}],
			}
		},
		computed: {
			uid () {
				if (this.$route.params.uid) {
					return this.$route.params.uid
				} else {
					return this.user_id;
				}
			},
			user_id () {
				if (this.$store.state.user.info) {
					return this.$store.state.user.info.user_id;
				}
			},
			showMeau () {
				return this.$route.meta.showMeau;
			}
		},
		watch: {
			page () {
				this.getData();
			},
			type () {
				this.getData();
			},
			showMeau (val) {
				this.initMeau();
			}
		},
		mounted () {
			this.initMeau();
			this.getData();
		},
		methods: {
			getData () {
				this.loading = true;
				this.$fetch.dynamic.get({
					type:　this.type,
					uid: this.uid,
					page: this.page,
					num: this.num
				}).then(res => {
					this.loading = false;
					if (res.code === 200) {
						this.dynamic = res.data;
						this.total = res.total;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			changePage (val) {
				this.page = val;
			},
			changeMeau (val) {
				this.type = val;
			},
			initMeau () {
				if (this.showMeau) {
					this.meau = this.t_meau;
				} else {
					this.meau = [];
				}
			}
		}
	}
</script>