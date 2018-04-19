<template>
	<div>
		<Input v-model="content" type="textarea" :rows="6" placeholder="欢迎提出任何疑问或建议"></Input>
		<Row type="flex" justify="end" class="mtb30">
			<Button type="success" @click="add_fmsg" style="width:150px;">提  交</Button>
		</Row>
		<div>
			<Menu mode="horizontal" active-name="fmsg">
		        <MenuItem name="fmsg">
		            反馈记录
		        </MenuItem>
		     </Menu>
			<Spin size="large" fix v-if="loading"></Spin>
			<fmsg-item v-for="(item, index) in fmsg" :item="item" :key="index" :index="index" @openDelModal="openDelModal"></fmsg-item>
		</div>
		<del-modal :type="2" :id="id" ref="del" @delFmsg="delFmsg"></del-modal>
	</div>
</template>
<script>
    import fmsgItem from './user-components/fmsg-item.vue'
    import {delModal} from '../components'
	export default {
		components: {
			fmsgItem,
			delModal
		},
		data () {
			return {
				content: '',
				fmsg: [],
				id: null,
				index: null,
				loading: false
			}
		},
		mounted () {
			this.get_fmsg();
		},
		methods: {
			get_fmsg () {
				this.loading = true;
				this.$fetch.msg.get_fmsg()
				.then(res => {
					if (res.code === 200) {
						this.fmsg = res.data;
					} else {
						this.$Message.error(res.msg);
					}
					this.loading = false;
				})
			},
			add_fmsg () {
				if (this.content !== '') {
					this.$fetch.user.send_fmsg({
						fmsg_content: this.content,
						fmsg_uid: this.uid
					}).then(res => {
						if (res.code === 200) {
							this.content = '';
							this.$Message.info('提交成功，感谢您的反馈');
							this.get_fmsg();
						} else {
							this.$Message.error(res.msg);
						}
					})
				} else {
					this.$Message.error('您貌似啥都没写o_O');
				}
			},
			delFmsg () {
				this.fmsg.splice(this.index, 1);
			},
			openDelModal (id, index) {
				this.id = id;
				this.$refs.del.openModal();
			}
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
