<style scoped>
	.oprice{
		color: rgb(185,185,185);
        text-decoration: line-through;
	}
	.nprice{
		font-size: 20px;
		color: #ed3f14;
	}
	.report:hover{
		color:#ed3f14;
	}
</style>
<template>
	<Card :dis-hover="true">
		<span slot="title" class="text-sub">
			{{data.goods_time}} <span class="fr report btn"><Icon type="alert-circled"></Icon> 举报</span>
		</span>
		<Row :gutter="20">
			<Col :span="12">
				<Carousel v-model="value" :height="400" loop>
			        <CarouselItem v-for="(item ,index) in data.goods_icon">
			            <img :src="item.url" alt="" style="width:100%; height:100%">
			        </CarouselItem>
			    </Carousel>
			</Col>
			<Col :span="12">
			    <h2>{{data.goods_name}}</h2>
				<Row class="mt10">
			        <Col span="8">
			            <p>分类</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.gclassify.name}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8">
			            <p>现价</p>
			        </Col>
			        <Col span="16">
			            <p class="nprice">￥ {{data.goods_nprice}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8">
			            <p>原价</p>
			        </Col>
			        <Col span="16">
			            <p class="oprice">￥ {{data.goods_oprice}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8">
			            <p>交易地址</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.goods_address}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8">
			            <p>交易方式</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.goods_type}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8">
			            <Button icon="heart" :type="data.is_fans ? 'warning' : 'ghost'" class="mr30" @click="follow(data.goods_id)">{{data.is_fans ? '已' : ''}}收藏</Button>
			        </Col>
			        <Col span="16">
			            <Button type="success">联系卖家</Button>
			        </Col>
			    </Row>
			</Col>
		</Row>
	</Card>
</template>
<script>
	export default {
		props: ['data'],
		data () {
			return {
				value: 0
			}
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