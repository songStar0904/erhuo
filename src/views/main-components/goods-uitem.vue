<style scoped>
	.goods_info{
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
            <div class="clearfix goods_info">
		        <router-link :to="{ name: 'goods', params: { gid: data.goods_id }}" target="_blank" class="fl">
		            <h3 class="goods_name text-success">{{data.goods_name}}</h3>
		        </router-link>
		        <!-- 更多下拉框 -->
		        <Dropdown trigger="click" class="more fr" @on-click="onClick" v-if="data.user.id == uid">
			        <a href="javascript:void(0)">
			            <Icon type="ios-more" style="font-size:20px;"></Icon>
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem :name="0">删除</DropdownItem>
			            <DropdownItem :name="1">下架</DropdownItem>
			        </DropdownMenu>
			    </Dropdown>
		    </div>
            <Row class="mt10">
		        <Col span="5">
		            <p>分类：</p>
		        </Col>
		        <Col span="6">
		            <p>{{data.gclassify.name}}</p>
		        </Col>
		    </Row>
            <Row class="mt10">
		        <Col span="5">
		            <p>现价：</p>
		        </Col>
		        <Col span="6">
		            <p>￥{{data.goods_nprice}} 元</p>
		        </Col>
		        <Col span="5">原价：</Col>
		        <Col span="6" class="oprice">￥{{data.goods_oprice}} 元</Col>
		    </Row>
	        <div class="mt15">
	        	<Button icon="heart" :type="data.is_fans ? 'warning' : 'ghost'" class="mr30" @click="follow(data.goods_id)">{{data.is_fans ? '已' : ''}}收藏</Button>
	        	<router-link :to="{ name: 'gedit', params: { gid: data.goods_id }}" v-if="isOwn" target="_blank">
	        		<Button icon="compose" type="success" class="w100">编辑</Button>
	        	</router-link>
	            <Button icon="card" type="success" class="w100" v-else>购买</Button>
	        </div>
        </Col>
    </Row>
    <del-modal :type="1" :id="data.goods_id" ref="del" @delGoods="del_goods"></del-modal>
	</Card>
</template>
<script>
    import {delModal} from '../components'
	export default {
		components: {
			delModal
		},
		props: ['data', 'isOwn'],
		data () {
			return {}
		},
		methods: {
			follow (goods_id) {
				this.$fetch.goods.follow({
					followers_id: goods_id
				}).then(res => {
					if (res.code === 200) {
						this.data.is_fans = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			onClick (val) {
				if (val === 0) {
					this.$refs.del.openModal();
				} else if (val === 1) {
					this.sold_goods();
				}
			},
			del_goods () {
				this.$fetch.goods.del({
					goods_id: this.data.goods_id
				}).then(res => {
					if (res.code === 200) {
						this.$refs.del.closeModal();
						this.$Message.success(res.msg);
						this.$emit('del_goods');
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			sold_goods () {
				this.$fetch.user.sold_goods({
					goods_id: this.data.goods_id
				}).then(res => {
					if (res.code === 200) {
						this.$Message.success(res.msg);
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		computed: {
			uid () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info.user_id;
                }
            }
		}
	}
</script>