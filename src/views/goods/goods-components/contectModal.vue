<style lang="less">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
.t5{
	top: 5px;
    position: relative;
}
</style>
<template>
	<Modal
        title="联系方式"
        v-model="modal"
        class-name="vertical-center-modal">
        <Row v-for="item in contect" v-if="item.value" style="line-height: 40px;" :gutter="10">
        	<Col span="4">{{item.name}}</Col>
        	<Col span="18">{{item.value}}
        	 <a v-if="item.name == 'QQ'" target="_blank" :href="href"><img border="0" :src="src" alt="点击这里给我发消息" title="点击这里给我发消息" class="t5"/></a>
            </Col>
        </Row>
    </Modal>
</template>
<script>
	export default{
		props: ['qq', 'wechat', 'phone'],
		data () {
			return {
				modal: false,
				href: `http://wpa.qq.com/msgrd?v=3&uin=${this.qq}&site=qq&menu=yes`,
				src: `http://wpa.qq.com/pa?p=2:${this.qq}:51`
			}
		},
		computed: {
			contect () {
				let contect = [{
					name: 'QQ',
					value: this.qq
				}, {
					name: '微信',
					value: this.wechat
				}, {
					name: '手机',
					value: this.phone
				}];
				return contect;
			}
		},
		methods: {
			openModal () {
				this.modal = true;
			}
		}
	}
</script>