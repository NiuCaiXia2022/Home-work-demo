<template>
	<view class="content">
		<!-- 登录 -->
		<view class="login-bg"></view>

		<view class="login-box">
			<view class="login-title">{{flag?'注 册': '登 录'}}</view>

			<!-- 表单 -->
			<!-- <form @submit="handleToLogin">
				<view class="uni-form-item uni-column">
					<input class="uni-input" style="color:#ccc;" name="username" placeholder="请输入用户名" />
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">{{flag?'注册': '登录'}}</button>
				</view>
			</form> -->


			<!-- 表单 -->
			<uni-forms :modelValue="loginFormData" :rules="rules" label-position="top" ref="loginForm">
				<!-- required 星号显示 必填 -->
				<uni-easyinput class="input" :clearable="false" prefixIcon="person" type="text" :inputBorder="false"
					v-model.trim="loginFormData.username" placeholder="请输入用户名" />

				<uni-easyinput class="input" :clearable="false" prefixIcon="locked" :inputBorder="false" passwordIcon
					type="password" v-model.trim="loginFormData.password" placeholder="请输入密码" />

				<uni-easyinput v-if="flag" class="input" :clearable="false" prefixIcon="locked" :inputBorder="false"
					passwordIcon type="password" v-model.trim="loginFormData.repassword" placeholder="确认密码" />
				<button type="primary" class="mt-2" @click="handleToLogin(flag)">{{flag?'注册': '登录'}}</button>
			</uni-forms>



			<view class="flex align-center justify-between my-3 font ">
				<text class="py-3 text-main" @click="handleRegister">注册账号</text>
				<text class="py-3 text-light-muted">忘记密码？</text>
			</view>

			<view class=" flex align-center justify-center wechatlogin">
				<uni-icons custom-prefix="iconfont" class="icon-box" type="icon-weixin" size="28" color="#5ccc84">
				</uni-icons>
			</view>


			<view class="flex align-center justify-center mt-4" v-if="!flag">
				<label>
					<checkbox value="cb" checked="true" />
				</label>
				<text>已阅读并同意用户协议&隐私声明</text>
			</view>


		</view>


	</view>
</template>

<script>
	// 接口 
	import Login from '@/model/login.js'
	export default {
		data() {
			return {
				flag: false,
				loginFormData: {
					username: '',
					password: '',
					repassword: ''
				},
				form: {},
				rules: { //效验
					username: {
						rules: [{
							errorMessage: '姓名不能为空'
						}]
					},
					password: {
						rules: [{
							errorMessage: '密码不能为空'
						}]
					},
					// password: [{
					// 		required: true,
					// 		errMessage: '请输入密码'
					// 	},
					// 	// {minLength:5,pattem:/^[1]([3-9])[0-9]{9}$/,errMessage:'密码不合法'},
					// ]
				},

			}
		},
		methods: {
			// 点击登录
			handleToLogin(flag) {
				console.log(this.loginFormData.username);
				console.log(this.loginFormData.username.value);
				console.log('flag', flag);
				if (!flag) { //false
					if (this.loginFormData.username === '' && this.loginFormData.password === '') {
						// 消息提示框
						uni.showToast({
							title: '用户名/密码不能为空',
							duration: 2000,
							icon: 'none'
						});
					}
				} else {
					// this.flag = true
					// 跳转首页
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},

			// 发送请求
			async signLogin() {
				const data = {
					username: this.loginFormData.username,
					password: this.loginFormData.password
				}
				// const res = await Login.getToLogin()

			},

			// 点击注册
			handleRegister() {
				this.flag = true
			}

		},
		onLoad() {
			this.flag = false
			this.signLogin()
		}
	}
</script>

<style>
	pages {
		background-image: linear-gradient(120deg, #3bfdaf, #70d6f2);
	}

	.icon-box {
		border: #5ccc84 1px solid;
		padding: 10rpx;
		border-radius: 50%;
	}

	.login-bg {
		height: 220rpx;
		width: 100%;
		background-image: linear-gradient(120deg, #3bfdaf, #70d6f2);
	}

	.login-box {
		position: absolute;
		top: 180rpx;
		left: 0;
		right: 0;
		height: 600rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		padding: 60rpx 70rpx 0;
	}

	.login-title {
		font-size: 40rpx;
		margin-bottom: 50rpx;
	}

	.input {
		font-size: 55rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		color: #f5f5f5;
	}


	.image {
		width: 100rpx;
		height: 100rpx;
		background-color: #5ccc84;
		border-radius: 50%;
	}
</style>

// this.$refs[ref].validate().then(res => {
// console.log('success', res);
// uni.showToast({
// title: `校验通过`
// })
// }).catch(err => {
// console.log('err', err);
// })
