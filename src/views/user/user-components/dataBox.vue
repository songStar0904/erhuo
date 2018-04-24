<style scoped>
	.meau{
		position: relative;
		top: -30px;
	}
</style>
<template>
	<div>
		<my-meau class="meau" :meau="meau" @changeMeau="changeMeau" :active="active" v-if="meau.length > 0"></my-meau>
		<div v-if="data.length==0" style="text-align:center">
			<p style="margin:50px 0;">{{noDataTitle}}</p>
			<slot name="noDataBtn"></slot>
		</div>
		<div v-else>
			<Row type="flex" justify="end">
				<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
			</Row>
			<slot name="dataItem"></slot>
			<Row type="flex" justify="end">
				<Page :total="total" show-total show-elevator size="small" @on-change="changePage" :current="page" :page-size="num"></Page>
			</Row>
		</div>
		<Spin size="large" fix v-if="loading"></Spin>
	</div>
</template>
<script>
    import {myMeau} from '../../components';
	export default {
		props: ['meau', 'loading', 'page', 'num', 'total', 'data', 'noDataTitle'],
		components: {
			myMeau
		},
		data () {
			return {
				active: 0
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
			isOwn () {
				return this.user_id === this.uid ? true : false;
			},
			type () {
				return this.$route.meta.type;
			}
		},
		methods: {
			changePage (val) {
				this.$emit('changePage', val);
			},
			changeMeau (active) {
				this.active = active;
				this.$emit('changeMeau', active);
			}
		}
	}
</script>
