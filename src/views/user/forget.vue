<template>
    <layout :title="'找回密码'" :router="'login'" :h1="'已有二货账号'" :btn_text="'立即登录'">
        <Form slot="form" ref="userForm" :model="userForm" :label-width="80" :rules="ruleInline" style="padding: 30px 0;">
            <FormItem label="手机 / 邮箱" prop="user_name">
                <Input v-model="userForm.user_name" placeholder="请输入您的手机号码或邮箱..."></Input>
            </FormItem>
            <FormItem label="验证码" prop="code">
                <div style="display:inline-block;width:154px;">
                    <Input v-model="userForm.code" placeholder="请输入6位验证码..."></Input>
                </div>
                <div style="display:inline-block;position:relative;">
                    <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                </div>
            </FormItem>
            <FormItem label="新密码" prop="user_psd">
                <Input type="password" v-model="userForm.user_psd" placeholder="请输入新密码..."></Input>
            </FormItem>
            <FormItem label="确认新密码" prop="user_rpsd">
                <Input type="password" v-model="userForm.user_rpsd" placeholder="请确认新密码..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('userForm')" long>找回密码</Button>
            </FormItem>
        </Form>
    </layout>
</template>
<script>
import util from '../../libs/util.js';
import md5 from 'js-md5';
import layout from './user-components/layout.vue';
    export default {
        components: {
            layout
        },
        data () {
        	const validatePassCheck = (rule, value, callback) => {
                if (value.length < 6 || value.length > 10) {
                    callback(new Error('请输入6-10位密码'));
                } else if (!/^[a-z0-9_-]{6,10}$/.test(value)) {
                    callback(new Error('（只能包含数字字母_）'));
                } else {
                    callback();
                }
            };
            const validatePassCheck2 = (rule, value, callback) => {
                if (value.length < 6 || value.length > 10) {
                    callback(new Error('请输入6-10位密码'));
                } else if (value !== this.userForm.user_psd) {
                    callback(new Error('密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                	user_name: '',
                	user_rpsd: '',
                	user_psd: '',
                	code: '',
                },
                timer: null,
                schoolData: [],
                gettingIdentifyCodeBtnContent: '获取验证码',
                identifyCodeRight: false, // 验证码是否正确
	            hasGetIdentifyCode: false, // 是否点了获取验证码
	            canGetIdentifyCode: false, // 是否可点获取验证码
                ruleInline: {
                	user_name: [
                        { required: true, message: '输入用户名', trigger: 'blur' }
                    ],
                    user_psd: [{ validator: validatePassCheck, trigger: 'blur'}],
                    user_rpsd: [{ validator: validatePassCheck2, trigger: 'blur'}],
                    code: [{ required: true, min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let data = util.cloneObj(this.userForm);
                    	data.user_psd = md5(this.userForm.user_psd);
                        this.$fetch.user.find_psd(data)
                        .then(res => {
                        	if (res.code === 200) {
                        		this.$Message.info(res.msg);
                        	} else {
                        		this.$Message.error(res.msg);
                        	}
                        })
                    } else {
                        this.$Message.error('请填写正确表单');
                    }
                })
            },
            getIdentifyCode () {
	            this.hasGetIdentifyCode = true;
                this.canGetIdentifyCode = true;
                let timeLast = 60;
                this.timer = setInterval(() => {
                    if (timeLast >= 0) {
                        this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                        timeLast -= 1;
                    } else {
                        this.canGetCode()
                    }
                }, 1000);
                // you can write ajax request here
                this.$fetch.user.getCode({
                	username: this.userForm.user_name,
                	is_exist: 0
                }).then(res => {
                	if (res.code === 200) {
                		this.$Message.info(res.msg);
                	} else {
	                	this.canGetCode()
                		this.$Message.error(res.msg);
                	}
                }).catch(res => {
                	this.canGetCode()
                })
	        },
	        canGetCode () {
	        	clearInterval(this.timer);
                this.gettingIdentifyCodeBtnContent = '获取验证码';
                this.canGetIdentifyCode = false;
            }
        }
    }
</script>
