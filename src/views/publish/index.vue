<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div class="box">
        <div v-title>二货 - 发布</div>
        <Card :dis-hover="true" style="text-align:center; margin-bottom:30px;">{{title}}</Card>
        <Card :dis-hover="true" :padding="40">
            <Form ref="goods" :model="goods" :rules="ruleValidate" :label-width="80">
                <FormItem label="二货图片" prop="name">
                     <div class="demo-upload-list" v-for="item in goods.goods_icon">
                        <template v-if="1">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :default-file-list="defaultList"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        name="goods_icon"
                        multiple
                        type="drag"
                        :action="path"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                        <img :src="imgName" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="二货名称" prop="goods_name">
                    <Input v-model="goods.goods_name" placeholder="输入二货名称"></Input>
                </FormItem>
                <FormItem label="原价" prop="mail">
                    <InputNumber :min="1" v-model="goods.goods_oprice"></InputNumber>
                </FormItem>
                <FormItem label="现价" prop="mail">
                    <InputNumber :min="1" v-model="goods.goods_nprice"></InputNumber>
                </FormItem>
                <FormItem label="二货分类" prop="goods_cid">
                    <Select v-model="goods.goods_cid" placeholder="选择二货分类">
                        <Option v-for="(item, index) in classify" :key="index" :value="item.gclassify_id">{{item.gclassify_name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="出售/求购" prop="goods_sell">
                    <Switch v-model="goods.goods_sell" :true-value="1" :false-value="0" size="large">
                        <span slot="open">出售</span>
                        <span slot="close">求购</span>
                    </Switch>
                </FormItem>
                <FormItem label="交易方式" prop="goods_type">
                    <RadioGroup v-model="goods.goods_type">
                        <Radio :label="1">送货上门</Radio>
                        <Radio :label="2">自提</Radio>
                        <Radio :label="0">送货上门/自提</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="交易地址" prop="name" v-show="goods.goods_type!=1">
                    <Input v-model="goods.goods_address" placeholder="交易地址"></Input>
                </FormItem>
                <FormItem label="联系方式" prop="phone">
                    <Row type="flex" justify="space-between">
                        <Col span="7"><Input v-model="goods.phone" placeholder="手机号码"></Input></Col>
                        <span>QQ</span>
                        <Col span="7"><Input v-model="goods.qq" placeholder="QQ号码" :number="true"></Input></Col>
                        <span>微信</span>
                        <Col span="7"><Input v-model="goods.wechat" placeholder="微信号"></Input></Col>
                    </Row>
                </FormItem>
                <FormItem label="详情" prop="goods_summary">
                    <Input v-model="goods.goods_summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入详情"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="edit_goods('goods')" v-if="gid">确认修改</Button>
                    <Button type="primary" @click="handleSubmit('goods')" v-else>确认发布</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import util from '../../libs/util.js';
    export default {
        data () {
            return {
                title: '发布二货',
                goods: {
                    goods_name: '',
                    goods_cid: null,
                    goods_summary: '',
                    goods_type: '0',
                    goods_sell: 1,
                    goods_nprice: 1,
                    goods_oprice: 1,
                    goods_address: '',
                    goods_icon: [],
                    phone: '',
                    qq: null,
                    wechat: ''
                },
                ruleValidate: {
                    goods_name: [
                        { required: true, message: '请填写二货名称', trigger: 'blur' }
                    ],
                    goods_cid: [
                        { required: true, type: 'number', message: '请选择分类', trigger: 'blur' }
                    ],
                    goods_type: [
                        { required: true, type: 'number', message: '请选择交易方式', trigger: 'change' }
                    ],
                    goods_summary: [
                        { required: true, message: '请输入详情', trigger: 'blur' },
                        { type: 'string', max: 255, message: '不能超过255字符', trigger: 'blur' }
                    ]
                },
                imgName: '',
                visible: false,
                path: '',
                defaultList: []
            }
        },
        computed: {
            classify () {
                return this.$store.state.app.classify;
            },
            uid () {
                return this.$store.state.user.info.user_id;
            },
            gid () {
                return this.$route.params.gid;
            }
        },
        watch: {
            gid (val) {
                if (!val) {
                    this.goods = {}
                }
            }
        },
        created () {
            let info = this.$store.state.user.info;
            this.goods.phone = info.user_phone;
            this.goods.qq = info.user_qq;
            this.goods.wechat = info.user_wechat;
            this.setPath();
            this.title = this.gid ? '修改二货' : '发布二货';
        },
        methods: {
            setPath () {
                if (util.env == 'dev') {
                    this.path = '/api/goods/upload';
                } else {
                    this.path = 'http://123.207.59.229/api/goods/upload';
                }
            },
            getData () {
                this.$fetch.goods.get_edit({
                    goods_id: this.gid
                }).then(res => {
                    if (res.code === 200) {
                        this.goods = res.data;
                        this.defaultList = res.data.goods_icon;
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.goods.goods_uid = this.uid;
                        this.$fetch.goods.add(this.goods)
                        .then(res => {
                            if (res.code === 200) {
                                this.$Message.success('发布成功');
                                this.$router.push({
                                    name: 'usell'
                                });
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('请输入正确的表单内容!');
                    }
                })
            },
            edit_goods (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$fetch.goods.edit(this.goods)
                        .then(res => {
                            if (res.code === 200) {
                                this.$Message.success(res.msg);
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('请输入正确的表单内容!');
                    }
                })
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                console.log(file);
                this.$fetch.goods.del_img({
                    goods_id: this.goods.goods_id,
                    url: file.url
                }).then(res => {
                    if (res.code === 200) {
                        const fileList = this.$refs.upload.fileList;
                        this.goods.goods_icon.splice(fileList.indexOf(file), 1);
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            handleSuccess (res, file) {
                if (res.code === 200) {
                    file.url = res.data;
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
            },
            handleBeforeUpload () {
                const check = this.goods.goods_icon.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.goods.goods_icon = this.$refs.upload.fileList;
            if (this.gid) {
                this.getData();
            }
        }
    }
</script>
