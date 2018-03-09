<style scoped>
	.main{
		text-align:center;
		font-size: 20px;
	}
</style>
<template>
	<Card :dis-hover="true">
		<Row class="main">
			<Col span="12" class="text-warning"><Icon type="eye"></Icon> {{view}}</Col>
			<Col span="12" class="text-error"><Icon type="heart"></Icon> {{fans_num}}</Col>
			<!-- <Col span="8" class="text-info"><Icon type="chatbox-working"></Icon> {{msg_num}}</Col> -->
		</Row>
	</Card>
</template>
<script>
	export default{
		props: ['view', 'fans_num', 'msg_num']
	}
</script>