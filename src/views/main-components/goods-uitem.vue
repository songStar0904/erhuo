<style scoped>
	.goods_name{
		padding-bottom: 8px; 
		border-bottom: 1px dotted #dddee1;
	}
	.oprice{
		color: rgb(185,185,185);
        text-decoration: line-through;
	}
</style>
<template>
	<Card :dis-hover="true">
		<Row :gutter="16">
        <Col span="8">
            <img :src="data.goods_icon[0].url" :alt="data.goods_name" style="width:145px; height:145px;">
        </Col>
        <Col span="16">
	        <router-link :to="{ name: 'goods', params: { gid: data.goods_id }}">
	            <h3 class="goods_name text-success">{{data.goods_name}}</h3>
	        </router-link>
            <Row class="mt10">
		        <Col span="4">
		            <p>分类：</p>
		        </Col>
		        <Col span="6">
		            <p>{{data.gclassify.name}}</p>
		        </Col>
		    </Row>
            <Row class="mt10">
		        <Col span="4">
		            <p>现价：</p>
		        </Col>
		        <Col span="6">
		            <p>￥{{data.goods_nprice}} 元</p>
		        </Col>
		        <Col span="4">原价：</Col>
		        <Col span="6" class="oprice">￥{{data.goods_oprice}} 元</Col>
		    </Row>
	        <div class="mt15">
	        	<Button icon="heart" :type="data.is_fans ? 'warning' : 'ghost'" class="mr30" @click="follow(data.goods_id)">{{data.is_fans ? '已' : ''}}收藏</Button>
	        	<router-link :to="{ name: 'gedit', params: { gid: data.goods_id }}" v-if="isOwn">
	        		<Button icon="compose" type="success" class="w100">编辑</Button>
	        	</router-link>
	        	
	            <Button icon="card" type="success" class="w100" v-else>购买</Button>
	        </div>
        </Col>
    </Row>
	</Card>
</template>
<script>
	export default {
		props: ['data', 'isOwn', 'user_id'],
		data () {
			return {}
		},
		methods: {
			follow (goods_id) {
				this.$fetch.goods.follow({
					followers_id: goods_id,
					user_id: this.user_id
				}).then(res => {
					if (res.code === 200) {
						this.data.is_fans = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>