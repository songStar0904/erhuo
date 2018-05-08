<style scoped>
</style>
<template>
    <layout :title="'用户登录'" :router="'regist'" :h1="'没有二货账号'" :btn_text="'立即注册'">
        <Form slot="form" ref="userForm" :model="userForm" :label-width="80" :rules="ruleInline" style="padding: 30px 0;">
            <FormItem label="手机 / 邮箱" prop="user_name">
                <Input v-model="userForm.user_name" placeholder="请输入您的手机号码或邮箱..."></Input>
            </FormItem>
            <FormItem label="密码" prop="user_psd">
                <Input type="password" v-model="userForm.user_psd" placeholder="请输入您的密码..." @on-enter="handleSubmit('userForm')"></Input>
            </FormItem>
            <Row type="flex" justify="end">
	            <p class="text-success btn" style="margin-bottom:20px;" @click="forget">忘记密码？</p>
	        </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('userForm')" long>登  录</Button>
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
            return {
                userForm: {
                	user_name: '',
                	user_psd: ''
                },
                ruleInline: {
                	user_name: [
                        { required: true, message: '输入用户名', trigger: 'blur' }
                    ],
                    user_psd: [{ validator: validatePassCheck, trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let data = util.cloneObj(this.userForm);
                    	data.user_psd = md5(this.userForm.user_psd);
                        this.$fetch.user.login(data)
                        .then(res => {
                        	if (res.code === 200) {
                        		this.$Message.info(res.msg);
                                this.$store.commit('setUser', util.formatUserData(res.data));
                                this.$store.commit('setIslogin', 1);
                                this.$router.push({
                                    path: this.beforePath
                                });
                        	} else {
                        		this.$Message.error(res.msg);
                        	}
                        })
                    } else {
                        this.$Message.error('请填写正确表单');
                    }
                })
            },
            forget () {
            	this.$router.push({
                    name: 'forget'
                });
            }
        },
        computed: {
            beforePath () {
                if (this.$store.state.app.beforePath) {
                    return this.$store.state.app.beforePath;
                } else {
                    return '/home';
                }
            }
        }
    }
</script>
