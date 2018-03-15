<style lang="less" scoped>
</style>
<template>
	<layout :info="user_info">
		<div slot="leftInfo">
			<p style="color: #999;"><span>{{user_info.user_sid}}</span> | <span>{{user_info.user_sex}}</span></p>
			<Button type="success" icon="card" style="width:150px; margin-top:10px;">发布二货</Button>
		</div>
		<Menu :theme="'light'" :active-name="active" @on-select="changeMeau" slot="leftMeau" style="width: 246px;">
            <MenuItem name="msg">
                <Icon type="speakerphone"></Icon>
                通知
            </MenuItem>
            <MenuItem name="comment">
                <Icon type="at"></Icon>
                我的
            </MenuItem>
            <MenuItem name="2">
                <Icon type="filing"></Icon>
                私信
            </MenuItem>
		</Menu>
		<my-meau slot="rightMeau" :meau="meau" style="margin-bottom:20px;"></my-meau>
	</layout>
</template>
<script>
    import layout from '../layout/layout.vue';
    import {myMeau} from '../components/';
	export default{
		components: {
			layout,
			myMeau
		},
		data () {
			return {
				meau: [{
					name: 'comment',
					query: {
						status: 0
					},
					icon: 'bag',
					title: '未读'
				}, {
					name: 'comment',
					query: {
						status: 1
					},
					icon: 'happy-outline',
					title: '已读'
				}, {
					name: 'comment',
					query: {
						status: 2
					},
					icon: 'android-happy',
					title: '已回复'
				}],
				mactive: ''
			}
		},
		methods: {
            changeMeau (name) {
            	this.$router.push({
                    name
                });
            }
		},
		computed: {
            user_info () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info;
                }
            },
            active () {
            	return this.$route.name;
            }
        }
	}
</script>
