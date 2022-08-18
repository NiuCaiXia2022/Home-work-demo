<template>
	<!-- 登录 -->
	<view class="content">
		<!-- 返回上页 -->
		<view class="login-bg pt-3 pl-3" @click="handleBack">
			<uni-icons type="back" color="#fff" size="20"></uni-icons>
		</view>

		<view class="login-box">
			<view class="login-title">绑定手机号</view>

			<!-- 表单 -->
			<!-- <form @submit="handleToLogin"> -->
			<view class="flex mr-1 mb-3 form-icon p-3 rounded">
				<uni-icons type="person" size="22" class="mr-2"></uni-icons>
				<input class="uni-input" name="phone" v-model.trim="formData.phone" placeholder="请输入手机号" />
			</view>

			<view class="mb-3 flex form-icon p-3 rounded">
				<uni-icons type="locked" size="22" class="mr-2"></uni-icons>
				<input class="uni-input" name="code" v-model.trim="formData.code" placeholder="请输入验证码" />
			</view>

			<view class="uni-btn-v ">
				<button class="btn-color" form-type="submit" @click="handleToLogin">绑 定</button>
			</view>
			<!-- </form> -->

		</view>

	</view>
</template>

<script>
	// 接口 
	import UserModel from '@/model/userModel.js'
	export default {
		data() {
			return {
				formData: { // 表单
					phone: 'guojingyuttt',
					password: '123123',
				},
			}
		},
		methods: {
			// 返回上页
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 点击登录
			handleToLogin() {
				uni.showLoading({
					title: '提交中···',
					mask: false
				})
				this.pageType === 'login' ? this.signLogin() : this.handleRegister()
			},


			// 表单清空  
			formReset() {
				this.formData = {
					username: '',
					password: '',
					repassword: ''
				}
			},


		},
		onLoad() {}
	}
</script>

<style>

</style>
