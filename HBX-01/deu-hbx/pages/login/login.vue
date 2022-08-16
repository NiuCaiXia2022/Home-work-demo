<template>
	<view class="content">
		<!-- 登录 -->
		<view class="login-bg"></view>

		<view class="login-box">
			<view class="login-title">登 录</view>

			<uni-forms :modelValue="loginFormData" :rules="rules" label-position="top" ref="form">
				<!-- required 星号显示 必填 -->
				<uni-easyinput class="input" prefixIcon="person" type="text" v-model.trim="loginFormData.username"
					placeholder="请输入用户名" />
				<uni-easyinput class="input" prefixIcon="locked" :inputBorder="false" passwordIcon type="password"
					v-model.trim="loginFormData.password" placeholder="请输入密码" />

				<button type="primary" class="mt-2" @click="handleToLogin('valiForm')">登录</button>
			</uni-forms>


			<view class="flex align-center justify-between my-3 font ">
				<text class="py-3 text-main">注册账号</text>
				<text class="py-3 text-light-muted">忘记密码？</text>
			</view>

			<view class="flex align-center justify-center wechatlogin">
				<image src="" mode="" class="image"></image>
			</view>

			<view class="flex align-center justify-center mt-4">
				<label>
					<checkbox value="cb" checked="true" />
				</label>
				<text>已阅读并同意用户协议&隐私声明</text>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginFormData: {
					username: '',
					password: ''
				},
				form: {},
				rules: { //效验
					username: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
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
			handleToLogin(ref) {

				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})

			}

		}
	}
</script>

<style>
	pages {
		background-image: linear-gradient(120deg, #3bfdaf, #70d6f2);
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
		background-color: #f5f5f5;
	}
	
	
	.image{
		width: 100rpx;
		height: 100rpx;
		background-color: #5ccc84;
		border-radius: 50%;
	}
</style>
