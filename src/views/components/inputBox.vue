<template>
	<div>
		<Input type="textarea" :rows="rows" :placeholder="placeholder" v-model="value" :maxlength="max"></Input>
		<div class="mt10 clearfix">
			<span class="fr">
				<span :class="{'text-error': hint <= 0}" class="mr20 text-sub">{{hint}}</span>
				<Button type="primary" style="width:100px;" @click="submit">发 布</Button>
				<slot name="cancel" class="ml20"></slot>
		</span>
		</div>
		
	</div>
</template>
<script>
	export default {
		props: ['content', 'rows', 'placeholder'],
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
				if (this.value === '') {
					this.$Message.error('内容不能为空');
				} else {
					this.$emit('submit', this.value);
				}
			}
		}
	}
</script>