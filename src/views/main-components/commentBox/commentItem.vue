<style scoped>
	.pl0{
		padding-left: 0!important;
	}
	.pr0{
		padding-right: 0!important;
	}
</style>
<template>
	<Row>
		<Col span="3" class="pr0">
			<Avatar size="large" :src="comment.suser.icon" />
		</Col>
		<Col span="20" class="pl0">
			<p>{{comment.suser.name}} - {{comment.lmsg_time | formatDate}}</p>
			<p>{{comment.lmsg_content}}</p>
			<div class="child" v-if="comment.children">
				<Row v-for="(item, index) in comment.children" :key="index">
					<Col span="2" class="pl0 pr0">
						<Avatar :src="item.suser.icon" />
					</Col>
					<Col span="20" class="pl0">
						<p>{{item.suser.name}} - {{item.lmsg_time | formatDate}}</p>
						<p><span>@{{item.ruser.name}}</span>  {{item.lmsg_content}}</p>
					</Col>
				</Row>
			</div>
		</Col>
	</Row>
</template>
<script>
import util from '../../../libs/util.js'
	export default{
		props: ['comment'],
		filters: {
			formatDate (val) {
				return util.formatDateByNow(val);
			}
		}
	}
</script>