<template>
	<Card :dis-hover="true" class="mtb20">
		<Row>
			<Col span="2" class="ptb5">
				<user-name :uid="info.id">
					<Avatar size="large" slot="user" :src="info.icon" />
				</user-name>
			</Col>
			<Col span="22">
				<slot name="more"></slot>
				<user-name :uid="info.id">
					<span slot="user">{{info.name}}</span>
				</user-name> - 
				<span class="text-sub">{{time | formatDate}}</span>
				<slot name="content" class="mt10"></slot>
			</Col>
		</Row>
	</Card>
</template>
<script>
    import userName from './userName.vue';
	export default {
		props: ['info', 'time'],
		components: {
			userName
		}
	}
</script>