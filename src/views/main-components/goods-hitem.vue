<style scoped>
.goods_icon{
	width: 100%;
	height: 168px;
}
.tag{
	position: absolute;
	top: 139px;
	left: 5px;
}
.goods_item:hover{
	transform: translateY(-6px);
}
</style>
<template>
	<router-link :to="{ name: 'goods', params: { gid: data.goods_id }}" target="_blank">
		<Card :dis-hover="hover" :padding="0" class="mb20 goods_item">
			<div class="tag">
				<Tag color="red" v-if="data.goods_spread === 1">精品</Tag>
				<Tag color="gray" v-if="data.goods_status === 3">已出</Tag>
			</div>
			<img :src="data.goods_icon[0].url" alt="" class="goods_icon">
			<div class="p8">
				<div class="overflow">
					<!-- <Tooltip placement="top" :content="`${data.goods_name} - ${data.gclassify.name}`"> -->
						<span class="btn fz16">{{data.goods_name}}</span>
					<!-- </Tooltip> -->
					<span class="text-sub fz12">{{data.gclassify.name}}</span>
				</div>
				<div style="margin: 0px 0 8px;">
					<span class="text-warning mr10">￥{{data.goods_nprice}}</span>
					<span class="text-disabled disabled">￥{{data.goods_oprice}}</span>
				</div>
				<div class="text-disabled fz12 mb8">
					<span class="mr10"><Icon type="eye"></Icon> {{data.goods_view}}</span>
					<span class="mr10"><Icon type="fireball"></Icon> {{data.fans_num}}</span>
					<span class="mr10"><Icon type="chatbox-working"></Icon> {{data.msg_num}}</span>
				</div>
				<div style="border-top:1px solid #e9eaec; padding-top:8px;" class="clearfix">
				        <router-link :to="{ name: 'sell', params: { uid: data.user.id }}" span="16" class="btn fl"><Avatar :src="data.user.icon" size="small" /> <span >{{data.user.name}}</span></router-link>
				        <p class="fr">{{data.goods_time | filterDate}}</p>
				</div>
			</div>
		</Card>
    </router-link>
</template>
<script>
	export default {
		props: ['data'],
		data () {
			return {
				hover: true
			}
		},
		methods: {
		}
	}
</script>