<style scoped>
    .w300{
        display: inline-block;
        width: 300px;
    }
</style>
<template>
    <Form 
        ref="userForm"
        :model="userForm" 
        :label-width="100" 
        label-position="right"
        :rules="inforValidate"
    >
        <FormItem label="用户昵称：" prop="user_name">
            <Input v-model="userForm.user_name" class="w300"></Input>
        </FormItem>
        <FormItem label="手机：">
            <Row v-if="userForm.user_phone">
                <Col span="12">{{ userForm.user_phone | formatPhone}}</Col>
                <Col span="12"><Button type="text">修改</Button></Col>
            </Row>
            <Row v-else>
                <Col span="12">未绑定</Col>
                <Col span="12"><Button type="text">绑定</Button></Col>
            </Row>
        </FormItem>
        <FormItem label="邮箱：">
            <Row v-if="userForm.user_email">
                <Col span="12">{{ userForm.user_email }}</Col>
                <Col span="12"><Button type="text">修改</Button></Col>
            </Row>
            <Row v-else>
                <Col span="12">未绑定</Col>
                <Col span="12"><Button type="text">绑定</Button></Col>
            </Row>
        </FormItem>
        <FormItem label="QQ：" prop="user_qq">
            <Poptip trigger="focus" placement="right" content="注： 此QQ可在发布二货时自动填写">
               <Input v-model="userForm.user_qq" class="w300"></Input>
           </Poptip>
        </FormItem>
        <FormItem label="微信：" prop="user_wechat">
            <Poptip trigger="focus" placement="right" content="注： 此微信号可在发布二货时自动填写">
               <Input v-model="userForm.user_wechat" class="w300"></Input>
           </Poptip>
        </FormItem>
        <FormItem label="性别：">
            <span>{{ userForm.user_sex}}</span>
        </FormItem>
        <FormItem label="学校：">
            <span>{{userForm.user_sid}}</span>
        </FormItem>
        <FormItem label="二龄：">
            <span>{{userForm.user_rtime | formatDate}}</span>
        </FormItem>
        <FormItem label="上次登录：">
            <span>{{userForm.user_ltime | formatDate}} <Icon type="location" class="ml20 text-warning"></Icon> {{userForm.user_ip}}</span>
        </FormItem>

        <FormItem label="登录密码：">
            <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
        </FormItem>
        <FormItem label="个性签名">
            <Input v-model="userForm.user_sign" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写个性签名"></Input>
        </FormItem>
        <div>
            <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit" long>保存</Button>
        </div>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </Form>
</template>
<script>
import md5 from 'js-md5';
import util from '../../libs/util.js';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        const valideNumber = (rule, value, callback) => {
            if (!isNaN(value)) {
                callback();
            } else {
                callback(new Error('必须为纯数字'));
            }
        };
        return {
            userForm: {},
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                user_name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ],
                user_qq: [
                    { message: 'QQ号码不得超过12位', max: 11, trigger: 'blur'},
                    { validator: valideNumber }
                ],
                user_wechat: [
                    { message: '微信号仅支持6-20个字符', max: 20, min: 6, trigger: 'blur'}
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        showEditPassword () {
            this.editPasswordModal = true;
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    let data = {
                        user_name: this.userForm.user_phone ? this.userForm.user_phone : this.userForm.user_email,
                        user_psd: md5(this.editPasswordForm.newPass),
                        user_old_psd: md5(this.editPasswordForm.oldPass)
                    };
                    this.$fetch.user.change_psd(data)
                    .then(res => {
                        if (res.code === 200) {
                            this.savePassLoading = false;
                            this.editPasswordModal = false;
                            this.$Message.success(res.msg);
                        } else {
                            this.savePassLoading = false;
                            this.$Message.error(res.msg);
                        }
                    })
                }
            });
        },
        init () {
            this.userForm = util.cloneObj(this.$store.state.user.info);
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            this.$fetch.user.edit({
                user_id: this.userForm.user_id,
                user_name: this.userForm.user_name,
                user_sign:this.userForm.user_sign,
                user_qq: this.userForm.user_qq,
                user_wechat: this.userForm.user_wechat
            }).then(res => {
                this.save_loading = false;
                if (res.code === 200) {
                    this.$Message.success('保存成功');
                    this.$store.commit('setEditUser', res.data);
                } else {
                    this.$Message.error(res.msg); 
                }
            })
        }
    },
    mounted () {
        this.init();
    }
};
</script>
