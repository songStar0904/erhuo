<template>
	<div class="box">
		<div v-title>二货 - 动态</div>
		<dynamic-item :dynamic="dynamic" :index="0" @share="share" @openModal="openModal" v-if="isShow"></dynamic-item>
		<report-modal :type="3" :id="dynamic_id" ref="report"></report-modal>
		<del-modal :type="3" :id="dynamic_id" ref="del" @delDynamic="delDynamic"></del-modal>
		<share-modal :placeholder="shareContent" :type="1" :id="dynamic_id" ref="share" @shareDynamic="shareDynamic"></share-modal>
	</div>
</template>
<script>
    import {inputBox, shareModal, delModal, reportModal} from '../components';
    import dynamicItem from './dynamic-components/dynamicItem.vue';
	export default{
		components: {
			inputBox,
			dynamicItem,
			shareModal,
			delModal,
			reportModal
		},
		data () {
			return {
				content: '',
				dynamic: [],
				shareContent:'',
				loading: false,
				dynamic_id: null,
				isShow: false
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData () {
				this.loading = true;
				this.isShow = false;
				this.$fetch.dynamic.get_one({
					id: this.$route.params.did
				}).then(res => {
					this.loading = false;
					this.isShow = true;
					if (res.code === 200) {
						this.dynamic = res.data[0];
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			delDynamic (index) {
			},
			share () {
				let dynamic = this.dynamic;
				this.dynamic_id = dynamic.dynamic_id;
				this.shareContent = `@${dynamic.user.name}: ${dynamic.dynamic_content}`;
				console.log(this.$refs.share)
				this.$refs.share.openModal();
			},
			shareDynamic () {
				this.$Message.seccess('分享成功');
			},
			openModal (type, id) {
				this.dynamic_id = id;
				this.$refs[type].openModal();
			}
		},
		computed: {
			user_info () {
                if (this.$store.state.user.info) {
                    return this.$store.state.user.info;
                }
            }
		}
	}
</script>