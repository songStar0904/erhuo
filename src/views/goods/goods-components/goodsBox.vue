<style scoped>
	.oprice{
		color: rgb(185,185,185);
        text-decoration: line-through;
	}
	.pl0{
		padding-left: 0!important;
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
			{{data.goods_time}} <span class="fr report btn" @click="openModal(1)"><Icon type="alert-circled"></Icon> 举报</span>
		</span>
		<Row :gutter="20">
			<Col :span="12">
				<Carousel v-model="value" v-if="data.goods_icon.length > 1" :height="370">
			        <CarouselItem v-for="(item ,index) in data.goods_icon" :key="index">
			            <img :src="item.url" alt="" style="width: 100%; height:100%">
			        </CarouselItem>
			    </Carousel>
			    <img :src="data.goods_icon[0].url" alt="" style="width: 100%; height:370px" v-else>
			</Col>
			<Col :span="12">
			    <h2>{{data.goods_name}}</h2>
				<Row class="mt10">
			        <Col span="8" class="pl0">
			            <p>分类</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.gclassify.name}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8" class="pl0">
			            <p>现价</p>
			        </Col>
			        <Col span="16">
			            <p class="nprice">￥ {{data.goods_nprice}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8" class="pl0">
			            <p>原价</p>
			        </Col>
			        <Col span="16">
			            <p class="oprice">￥ {{data.goods_oprice}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8" class="pl0">
			            <p>交易地址</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.goods_address}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8" class="pl0">
			            <p>交易方式</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.goods_type}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10" v-if="data.phone">
			        <Col span="8" class="pl0">
			            <p>联系方式</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.phone}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10" v-if="data.qq">
			        <Col span="8" class="pl0">
			            <p>QQ</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.qq}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10" v-if="data.wechat">
			        <Col span="8" class="pl0">
			            <p>微信</p>
			        </Col>
			        <Col span="16">
			            <p>{{data.wechat}}</p>
			        </Col>
			    </Row>
			    <Row class="mt10">
			        <Col span="8" class="pl0">
			            <Button icon="heart" :type="data.is_fans ? 'warning' : 'ghost'" class="mr30" @click="follow(data.goods_id)">{{data.is_fans ? '已' : ''}}收藏</Button>
			        </Col>
			        <Col span="16">
			            <Button type="success" @click="openModal(2)">联系{{data.goods_sell ? '卖' : '买'}}家</Button>
			        </Col>
			    </Row>
			</Col>
		</Row>
		<Menu mode="horizontal" :active-name="active" @on-select="changeMeau">
		        <MenuItem name="detail">
		            <Icon type="ios-paper"></Icon>
		            商品详情
		        </MenuItem>
		        <MenuItem name="lmsg">
		            <Icon type="chatbox-working"></Icon>
		            留言({{data.goods_lmsg.length}})
		        </MenuItem>
		    </Menu>
		<div class="detailBox mt10" v-show="active === 'detail'">
			{{data.goods_summary}}
	    </div>
	    <div class="lmsgBox mt10" v-show="active === 'lmsg'">
	    	<comment-box :data="data.goods_lmsg" :id="data.goods_id" :rid="data.user.id" type="goods">
	    	</comment-box>
	    </div>
	    <report-modal :type="1" :id="data.goods_id" ref="report"></report-modal>
	    <contect-modal :qq="data.qq" :wechat="data.wechat" :phone="data.phone" ref="contect"></contect-modal>
	</Card>
</template>
<script>
    import {commentBox} from '../../main-components';
    import {reportModal} from '../../components';
    import contectModal from './contectModal.vue';
	export default {
		components: {
			commentBox,
			reportModal,
			contectModal
		},
		props: ['data'],
		data () {
			return {
				value: 0,
				active: 'detail'
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
						this.$emit('updateFansNum', res.data);
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			changeMeau (val) {
				this.active = val;
			},
			openModal (type) {
				if (type === 1) {
					this.$refs.report.openModal();
				} else {
					this.$refs.contect.openModal();
				}
				
			}
		}
	}
</script>