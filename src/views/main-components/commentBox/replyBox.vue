<template>
	<div v-if="uid" class="mtb10 clearfix">
		<div class="user-face">
		    <slot name="icon"></slot>
	    </div>
		<div class="con">
		    <input-box :content="value" @submit="reply" :placeholder="placeholder" :rows="2">
		    	<span slot="cancel">
		    		<slot name="cancel"></slot>
		    	</span>
		    </input-box>
		</div>
	</div>
	<div v-else>登录之后，才能评论</div>
</template>
<script>
    import {inputBox} from '../../components/';
	export default{
		// id 留言id rid 回复者id
		props: ['placeholder', 'lid', 'id', 'rid', 'type'],
		components: {
			inputBox
		},
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
			reply (val) {
				this.value = val;
				if (this.value.length > 255) {
					this.$Message.warning('回复内容不能超过255字符');
				} else if (this.value.length <= 0) {
					this.$Message.warning('回复内容不能为空');
				} else {
					this.$fetch.msg.send({
						content: this.value,
						type: this.type,
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