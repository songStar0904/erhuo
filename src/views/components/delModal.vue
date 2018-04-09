<template>
	<Modal v-model="modal" width="360">
        <p slot="header" style="color:#f60;">
            <Icon type="information-circled"></Icon>
            <span>{{title}}</span>
        </p>
        <div style="font-size:16px;">
            {{content}}
        </div>
        <div slot="footer">
        	<Button @click="modal = false">我点错了</Button>
            <Button type="error" :loading="loading" @click="del">确认删除</Button>
        </div>
    </Modal>
</template>
<script>
	export default {
		props: ['type', 'id'],
		data () {
			return {
				modal: false,
				loading: false,
				title: '',
				content: ''
			}
		},
		mounted () {
			if (this.type === 3) {
				this.title = '删除动态';
				this.content = '确定要删除此动态吗？'
			}
		},
		methods: {
			openModal () {
				this.modal = true;
			},
			del () {
				if (this.type === 3) {
					// 删除动态
					this.del_dynamic();
				}
			},
			del_dynamic () {
				this.$fetch.dynamic.del({
					id: this.id
				}).then(res => {
					if (res.code === 200) {
						this.modal = false;
						this.$emit('delDynamic')
						this.$Message.info(res.msg);
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		}
	}
</script>