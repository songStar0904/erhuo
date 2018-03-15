<style scoped>
.reply{
	margin: 30px;
}
</style>
<template>
	<div>
		<reply-box placeholder="说点什么" :type="type" :id="id" :lid="0" :rid="rid" class="reply">
			<user-name :uid="user.user_id" slot="icon" class="icon" v-if="user">
				<Avatar slot="user" :src="user.user_icon" />
			</user-name>
		</reply-box>
		<div v-if="data.length > 0">
			<comment-item v-for="(item, index) in data" :key="index" :id="id" :comment="item"></comment-item>
		</div>
		<div v-else>还没有留言哦</div>
    </div>
</template>
<script>
    import commentItem from './commentItem.vue';
    import replyBox from './replyBox.vue';
    import {userName} from '../../components';
	export default{
		components: {
			commentItem,
			replyBox,
			userName
		},
		computed: {
			user () {
				if (this.$store.state.user.info) {
					return this.$store.state.user.info;
				}
			}
		},
		props: ['data', 'type', 'id', 'rid']
	}
</script>
