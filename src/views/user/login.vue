<style scoped>
	@import '../../style/common.css';
</style>
<template>
    <layout :title="'用户登录'" :router="'regist'" :h1="'没有二货账号'" :btn_text="'立即注册'">
        <Form slot="form" ref="userForm" :model="userForm" :label-width="80" :rules="ruleInline" style="padding: 30px 0;">
            <FormItem label="手机 / 邮箱" prop="user_name">
                <Input v-model="userForm.user_name" placeholder="请输入您的手机号码或邮箱..."></Input>
            </FormItem>
            <FormItem label="密码" prop="user_psd">
                <Input type="password" v-model="userForm.user_psd" placeholder="请输入您的密码..."></Input>
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
                                this.$store.commit('setUser', this.filterData(res.data));
                                this.$router.push({
                                    name: 'home'
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
            // 格式 性别与学校
            filterData (data) {
                console.log()
                data.user_sid = this.formatSchool(data.user_sid);
                data.user_sex = this.formatSex(data.user_sex);
                data.user_ltime = this.formatDate(data.user_ltime);
                data.user_phone = this.formatPhone(data.user_phone);
                return data;
            },
            formatSex (val) {
                if (val === 'male') {
                    return '男生';
                } else {
                    return '女生';
                }
            },
            formatPhone (val) {
                return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            },
            formatSchool (val) {
                if (val) {
                    return util.formatSchool(val);
                }
            },
            formatDate (val) {
                return util.formatDate(val);
            },
            forget () {
            	this.$router.push({
                    name: 'forget'
                });
            }
        }
    }
</script>
