<template>
	<Modal v-model="modal" width="360">
        <p slot="header" style="color:#19be6b;">
            <span>{{title}}</span>
        </p>
        <Input v-model="content" :placeholder="placeholder"></Input>
        <div slot="footer">
            <Button type="success" :loading="loading" @click="share">分享</Button>
        </div>
    </Modal>
</template>
<script>
	export default {
		props: ['type', 'placeholder', 'id'],
		data () {
			return {
				modal: false,
				loading: false,
				title: '',
				content: ''
			}
		},
		mounted () {
			if (this.type === 1) {
				this.title = '分享动态';
			}
		},
		methods: {
			openModal () {
				console.log('open')
				this.modal = true;
			},
			closeModal () {
				this.modal = false;
			},
			share () {
				if (this.type === 1) {
					// 分享动态
					this.share_dynamic();
				}
			},
			share_dynamic () {
				this.$fetch.dynamic.share({
					dynamic_lid: this.id,
					dynamic_content: this.content + ' //' + this.placeholder
				}).then(res => {
					if (res.code === 200) {
						this.modal = false;
						this.content = '';
						this.$emit('shareDynamic');
						this.$Message.info(res.msg);
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>