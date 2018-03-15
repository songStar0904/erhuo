<style scoped>
	.text{
	    padding: 0 7px;
	    border-radius: 13px;
	    color: #999;
	    background-color: #f4f4f4;
	    line-height: 24px;
	}
	.more{
		display: inline-block;
	    width: 30px;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    font-size: 20px;
	    color: #999;
	}
</style>
<template>
	<Card :dis-hover="true" class="mtb20">
		<Row>
			<Col span="2" class="ptb5">
				<user-name :uid="comment.suser.id">
					<Avatar size="large" slot="user" :src="comment.suser.icon" />
				</user-name>
			</Col>
			<Col span="22">
			    <Icon type="ios-more" class="more fr"></Icon>
			    <!-- <Icon type="android-more-vertical" ></Icon> -->
				<user-name :uid="comment.suser.id">
					<span slot="user">{{comment.suser.name}}</span>
				</user-name>
				<span> - {{comment.lmsg_time | formatDate}}</span>
				<p class="ptb5">回复@{{comment.ruser.name}}: {{comment.lmsg_content}}</p>
				<p class="text">
				    <goods-name :gid="comment.goods.id" :name="comment.goods.name"></goods-name>  评论中@了你
				</p>
			</Col>
		</Row>
	</Card>
</template>
<script>
    import util from '../../../libs/util.js';
    import {userName, goodsName} from '../../components';
	export default{
		components: {
			userName,
			goodsName
		},
		props: ['comment'],
		filters: {
			formatDate (val) {
				return util.formatDateByNow(val);
			}
		}
	}
</script>