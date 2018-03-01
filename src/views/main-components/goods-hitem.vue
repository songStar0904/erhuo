<style scoped>
.goods_icon{
	width: 100%;
	height: 100%;
}

</style>
<template>
	<Card :dis-hover="true" :padding="0" class="mb20">
		<img :src="data.goods_icon[0].url" alt="" class="goods_icon">
		<div class="p8">
			<div>
				<span class="btn fz16">{{data.goods_name}}</span>
				<span class="text-sub fz12">{{data.gclassify.name}}</span>
			</div>
			<div style="margin: 0px 0 8px;">
				<span class="text-warning mr10">￥{{data.goods_nprice}}</span>
				<span class="text-disabled disabled">￥{{data.goods_oprice}}</span>
			</div>
			<div class="text-disabled fz12 mb8">
				<span class="mr10"><Icon type="eye"></Icon> {{data.goods_view}}</span>
				<span class="mr10"><Icon type="fireball"></Icon> {{data.goods_view}}</span>
				<span class="mr10"><Icon type="chatbox-working"></Icon> {{data.goods_view}}</span>
			</div>
			<div style="border-top:1px solid #e9eaec; padding-top:8px;" class="clearfix">
			        <div span="16" class="btn fl"><Avatar :src="data.user.icon" size="small" /> <span @click="toPerson(data.user.id)">{{data.user.name}}</span></div>
			        <p class="fr">{{data.goods_time | filterDate}}</p>
			</div>
		</div>
	</Card>
</template>
<script>
import util from '../../libs/util.js';
	export default {
		props: ['data'],
		filters: {
			filterDate (val) {
				return util.formatDateByNow(val);
			}
		},
		data () {
			return {}
		},
		methods: {
			toPerson (uid) {
				this.$router.push({
					name: 'sell',
					params: {
						uid
					}
				})
			}
		}
	}
</script>