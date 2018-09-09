<template>
  <div class="userForm">
	<header>
		<ul>
			<li class='back' @click='back'>×</li>
			<li class="title">注册</li>
			<li class="more">协议</li>
		</ul>
	</header>
	<div class="content">
		<mt-field  placeholder="请输入手机号" :state="telState" type="tel" v-model='tel'></mt-field>
		<mt-field placeholder="请输入验证码" v-model='code'>
		  <span @click='sendCode'>发送验证码</span>
		</mt-field>
		<mt-field  placeholder="请输入密码" :state='passwordState' type="password" v-model="password"></mt-field>
		<mt-button type="default" size="large" @click='check'>注册</mt-button>
	</div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Field, Button, Toast} from 'mint-ui'
import axios from 'axios'
Vue.use(Field)
Vue.use(Button)
export default {
	data () {
		return {
			tel: '18813007814',
			code: '',
			adminCode: '',
			password: '123456'
		}
	},
	computed: {
		telState () {
			// 手机验证
			const str = "^1(3|4|5|6|7|8|9)\\d{9}$"
			if (this.tel.match(str)) {
				return 'success'
			} else {
				if(this.tel == '') {
					return ''
				} else {
					return 'error'
				}
				
			}
		},
		passwordState () {
			// 由数字、26个英文字母组成的字符串 
			const str = '^[A-Za-z0-9]+$'
			if (this.password.match(str) && this.password.length >= 6) {
				return 'success'
			} else {
				if(this.password == '') {
					return ''
				} else {
					return 'error'
				}
				
			}
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		sendCode () {
			axios.get('http://www.daxunxun.com/users/sendCode?tel='+this.tel)
				.then(res => {
					// console.log(res.data)
					if (res.data == 1) {
						Toast({
						  message: '改手机号已存在，请直接登录',
						  position: 'bottom',
						  duration: 2000
						});
					} else if (res.data == 0) {
						Toast({
						  message: '获取验证码失败',
						  position: 'bottom',
						  duration: 2000
						});
					} else {
						this.adminCode = res.data.code
					}
				})
				.catch(err => console.log(err))
		},
		check () {
			if (this.telState != 'success') {
				Toast({
				  message: '手机号无效',
				  position: 'bottom',
				  duration: 2000
				});
				return;
			}
			if (this.code != '') {
				if(this.code != this.adminCode) {
					Toast({
					  message: '验证码错误',
					  position: 'bottom',
					  duration: 2000
					});
					return;
				}
			} else {
				Toast({
				  message: '请输入验证码',
				  position: 'bottom',
				  duration: 2000
				});
				return;
			}
			if (this.passwordState != 'success') {
				Toast({
				  message: '密码无效',
				  position: 'bottom',
				  duration: 2000
				});
				return;
			}
			this.register()
		},
		register () {
			axios.post('http://www.daxunxun.com/users/register', {
				username: this.tel,
				password: this.password
			}).then(res => {
				if (res.data == 2) {
					Toast({
					  message: '用户已注册，请直接登录',
					  position: 'bottom',
					  duration: 2000
					});
				} else if (res.data == 0) {
					Toast({
					  message: '注册失败',
					  position: 'bottom',
					  duration: 2000
					});
				} else {
					this.$router.push('/home')
				}
			}).catch(err => console.log(err))
		}
	}
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.userForm {
	@include rect(100%, 100%);
	background: url('../assets/bg.jpg') no-repeat center;
	background-size: cover;
	@include flexbox();
	@include flex-direction(column);
	header {
		@include rect(100%, 0.44rem);
		
		ul {
			@include rect(100%, 100%);
			@include flexbox();
			li{
				@include flexbox();
				@include justify-content();
				@include align-items(); 
				@include text-color(#fff);

				&.back{
					@include rect(50px, 100%);
					@include font-size(0.24rem);
				}
				&.title{
					@include flex();
					@include font-size(0.16rem);
				}
				&.more {
					@include rect(50px, 100%);
				}
			}
		}
	}
	.content {
		@include flex();
		@include rect(100%, auto);
		@include padding(0.1rem 0.1rem);
		.mint-field {
			@include border(0 0 1px 0, #fff);
			span{
				@include text-color(#fff);
			}
		}
		.mint-button {
			@include margin(0.2rem 0);
			/* @include background-color(transparent);
			@include border(1px, #fff); */
		}
	}
}
</style>
