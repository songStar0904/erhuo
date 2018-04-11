<template>
	<div style="overflow:hidden;">
		<Input v-model="content" type="textarea" :rows="6" placeholder="欢迎提出任何疑问或建议"></Input>
		<Button type="success" @click="add_fmsg" style="width:150px; margin-top:30px; float:right; ">提  交</Button>

	</div>
</template>
<script>
	export default {
		data () {
			return {
				content: '',
				fmsg: []
			}
		},
		mounted () {
			this.get_fmsg();
		},
		methods: {
			get_fmsg () {
				this.$fetch.msg.get_fmsg()
				.then(res => {
					if (res.code === 200) {
						this.fmsg = res.data;
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			add_fmsg () {
				if (this.content !== '') {
					this.$fetch.user.send_fmsg({
						fmsg_content: this.content,
						fmsg_uid: this.uid
					}).then(res => {
						if (res.code === 200) {
							this.content = '';
							this.$Message.info('提交成功，感谢您的反馈');
						} else {
							this.$Message.error(res.msg);
						}
					})
				} else {
					this.$Message.error('您貌似啥都没写o_O');
				}
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
