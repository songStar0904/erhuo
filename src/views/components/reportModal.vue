<template>
	<Modal v-model="modal" width="500">
        <p slot="header" style="text-align:center;">
            <Icon type="information-circled"></Icon>
            <span>请选择举报理由</span>
        </p>
        <RadioGroup v-model="report" class="mb15">
	        <div class="text-sub mb15">违反法律法规</div>
	        <Radio label="人身攻击"></Radio>
	        <Radio label="色情低俗"></Radio>
	        <Radio label="赌博诈骗"></Radio>
	        <div class="text-sub mtb15">有害社区环境</div>
	        <Radio label="人身攻击"></Radio>
	        <Radio label="垃圾广告"></Radio>
	        <Radio label="其他"></Radio>
	    </RadioGroup>
	    <Input v-model="content" v-show="report === '其他'" type="textarea" placeholder="自定义理由"></Input>
        <div slot="footer">
        	<Button  size="large" @click="modal = false">我手滑了</Button>
            <Button  type="success" size="large"  :loading="loading" @click="reportAjax">确认举报</Button>
        </div>
    </Modal>
</template>
<script>
	export default {
		props: ['type', 'id'],
		data () {
			return {
				modal: false,
				report: '',
				content: '',
				loading: false
			}
		},
		methods: {
			openModal () {
				this.modal = true;
			},
			reportAjax () {
				if (this.report) {
					if (this.report === '其他' && this.content === '') {
						this.$Message.error('请输入自定义理由');
					} else {
						console.log(this.report, this.content, this.type, this.id);
						this.$fetch.main.report({
							report_gid: this.id,
							report_type: this.type,
							report_content: this.content,
							report_reason: this.report
						}).then(res => {
							this.$Message.info(res.msg);
							if (res.code === 200) {
								this.modal = false;
								this.report = null;
								this.content = '';
							}
						})
					}
				} else {
					this.$Message.error('请选择举报理由');
				}
			}

		}
	}
</script>