<template>
	<div>
	<Table border :columns="columns" :loading="loading" :data="data" style="margin: 30px 0 15px;"></Table>
		<Row type="flex" justify="end">
			<Page :total="total" show-total show-elevator :size="pageSize" :current="page" :page-size="num" @on-change="changePage"></Page>
		</Row>
	</div>
</template>
<script>
	export default{
		props: ['columns', 'data', 'loading', 'total', 'pageSize', 'page', 'num'],
		data () {
			return {
			}
		},
		methods: {
			changePage (val) {
				this.$emit('setPage', val);
			}
		}
	}
</script>
