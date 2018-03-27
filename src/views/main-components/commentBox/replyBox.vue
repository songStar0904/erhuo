<template>
	<Row v-if="uid" :gutter="20" class="mtb10">
		<Col span="3" style="text-align:center">
		    <slot name="icon"></slot>
	    </Col>
		<Col span="18">
		    <Input v-model="value" :placeholder="placeholder"></Input>
		</Col>
		<Col span="3">
		    <Button type="success" @click="reply">回复</Button>
	    </Col>
	    <Col span="3">
	        <slot name="cancel"></slot>
	    </Col>
		 
	</Row>
	<div v-else>登录之后，才能评论</div>
</template>
<script>
	export default{
		// id 留言id rid 回复者id
		props: ['placeholder', 'lid', 'id', 'rid'],
		data () {
			return {
				value: ''
			}
		},
		computed: {
			uid () {
				if (this.$store.state.user.info) {
					return this.$store.state.user.info.user_id;
				}
			}
		},
		methods: {
			reply () {
				if (this.value.length > 255) {
					this.$Message.warning('回复内容不能超过255字符');
				} else if (this.value.length <= 0) {
					this.$Message.warning('回复内容不能为空');
				} else {
					this.$fetch.msg.send({
						content: this.value,
						type: 'goods',
						id: this.id,
						lid: this.lid,
						rid: this.rid
					}).then(res => {
						if (res.code === 200) {
							this.$Message.success(res.msg);
							this.value = '';
							this.$emit('updateMsg');
						} else {
							this.$Message.error(res.msg);
						}
					})
				}
			}
		}
	}
</script>