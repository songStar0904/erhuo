<style lang="less" scoped>
.user_name{
	font-size: 18px;
}
</style>
<template>
	<div class="box">
		<Row :gutter="50">
	        <Col span="8">
	        <Card :dis-hover="true" style="padding:20px; background:#fff; text-align: center; margin-bottom:30px;">
	        	<Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        name="user_icon"
                        :data="{'user_id': uid}"
                        :action="path"
                        v-if="uid === info.user_id">
                        <Tooltip placement="top" content="更改头像">
	                        <Avatar :src="info.user_icon" class="large_icon btn"/>
                        </Tooltip>
                    </Upload>
	        	<Avatar :src="info.user_icon" class="large_icon" v-else/>
	        	<h3 class="text-success btn user_name">{{info.user_name}}</h3>
	        	<slot name="leftInfo"></slot>
			</Card>
			<Card :dis-hover="true">
	        	<slot name="leftMeau"></slot>
			</Card>
			<Card :dis-hover="true" style="margin-top: 30px;">
	        	<slot name="leftBottom"></slot>
			</Card>
			
	        </Col>
	        <Col span="16">
	            <Card :padding="30">
	            	<slot name="rightMeau"></slot>
			        <router-view></router-view>
			    </Card>
	        </Col>
	    </Row>
    </div>
</template>
<script>
import util from '../../libs/util.js'
	export default {
		props: ['info'],
		computed: {
			path () {
                if (util.env == 'dev') {
                    return '/api/user/upload';
                } else {
                    return 'api.erhuo.com/user/upload';
                }
            },
			uid () {
				if (this.$store.state.user.info) {
					return this.$store.state.user.info.user_id;
				}
			}
		},
		methods: {
            handleSuccess (res, file) {
                if (res.code === 200) {
                    this.info.user_icon = res.data;
                    this.$store.commit('setUser', this.info);
                    this.$Message.success('上传头像成功');
                } else {
                    this.$Message.error(res.msg);
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            }
		}
	}
</script>
