<style scoped>
	.dynamic_repost{
		background-color: #f4f5f7;
	}
</style>
<template>
	<Card class="dynamic_repost" :dis-hover="true" :padding="8">
		<user-name :uid="dynamic.user.id">
			<p slot="user" class="text-success">@{{dynamic.user.name}} :</p>
		</user-name>
		<p class="ptb5">{{dynamic.dynamic_content}}</p>
		<div v-if="dynamic.dynamic_type === 2">
			<goods-uitem :data="dynamic.goods" :isOwn="uid === dynamic.user.id"></goods-uitem>
		</div>
	</Card>
</template>
<script>
    import {userName} from '../../components/'
    import goodsUitem from '../../main-components/goods-uitem.vue';
	export default {
		props: ['dynamic'],
		components: {
			userName,
			goodsUitem,
		},
		data () {
			return {
			}
		},
		methods: {
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
