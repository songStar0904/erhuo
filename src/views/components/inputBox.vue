<template>
	<div>
		<Input type="textarea" :rows="4" placeholder="有什么想和大家分享的？" v-model="value" :maxlength="max"></Input>
		<div class="mt10 clearfix">
			<span class="fr"><span :class="{'text-error': hint <= 0}" class="mr20 text-sub">{{hint}}</span> <Button type="primary" style="width:100px;" @click="submit">发 布</Button></span>
		</div>
		
	</div>
</template>
<script>
	export default {
		props: ['content'],
		data () {
			return {
				max: 233,
				hint: 233,
				value: ''
			}
		},
		mounted () {
			this.hint = this.max;
		},
		watch: {
			value (val) {
				this.hint = this.max - this.value.replace(/[^\x00-\xff]/g, "x").length;
			},
			content (val) {
				this.value = val;
			}
		},
		methods: {
			submit () {
				this.$emit('submit', this.value);
			}
		}
	}
</script>