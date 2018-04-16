<template>
	<div style="height:183px;">
		<user-info :info="info" v-if="!loading">
			<div slot="userInfo">
				<p style="color: #999;" class="mb10"><span>{{info.user_sid | formatSid}}</span> | <span>{{info.user_sex | formatSex}}</span></p>
				<fol-send :is_fans="info.user_is_fans" :uid="info.user_id" size="small" @updateFans="updateFans"></fol-send>
			</div>
		</user-info>
		<Spin fix v-if="loading"></Spin>
	</div>
</template>
<script>
import userInfo from './userInfo.vue';
import folSend from './folSend.vue';
export default {
	components: {
		userInfo,
		folSend
	},
	props: ['info', 'loading'],
	methods: {
		updateFans (val) {
			this.info.user_is_fans = val;
		}
	}
}
</script>