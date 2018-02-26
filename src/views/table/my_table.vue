<template>
	<div>
	<Table border :columns="columns" :loading="loading" :data="data" style="margin: 30px 0 15px;"></Table>
		<Row type="flex" justify="end">
			<Page :total="total" show-total show-elevator :size="pageSize" @on-change="changePage"></Page>
		</Row>
	</div>
</template>
<script>
	export default{
		props: ['columns', 'data', 'loading', 'total', 'pageSize'],
		data () {
			return {
			}
		},
		motheds: {
			changePage (val) {
				this.$emit('changePage', val);
			}
		}
	}
</script>
