<template>
	<!-- 登录 -->
	<view class="content">
		<!-- 返回上页 -->
		<view class="login-bg pt-3 pl-3" @click="handleBack">
			<!-- back -->
			<uni-icons type="back" color="#fff" size="20"></uni-icons>
		</view>

		<view class="login-box">
			<view class="login-title">{{pageType==='login'?'登 录': '注 册'}}</view>

			<!-- 表单 -->
			<!-- <form @submit="handleToLogin"> -->
			<view class="flex mr-1 mb-2 form-icon p-2 rounded">
				<uni-icons type="person" size="22" class="mr-2"></uni-icons>
				<input class="uni-input" name="username" v-model.trim="formData.username" placeholder="请输入用户名" />
			</view>

			<view class="mb-2 flex form-icon p-2 rounded">
				<uni-icons type="locked" size="22" class="mr-2"></uni-icons>
				<input class="uni-input" name="password" v-model.trim="formData.password" placeholder="请输入密码" />
			</view>

			<view class="mb-2 flex form-icon p-2 rounded" v-if="pageType==='reg'">
				<uni-icons type="locked" size="22" class="mr-2"></uni-icons>
				<input class="uni-input" name="repassword" v-model.trim="formData.repassword" placeholder="确认密码" />
			</view>

			<view class="uni-btn-v">
				<button form-type="submit" class="btn-color"
					@click="handleToLogin">{{pageType==='login'?'登 录': '注 册'}}</button>
			</view>
			<!-- </form> -->

			<!--忘记密码  -->
			<view class="flex align-center justify-between my-3 font ">
				<text class="py-3 text-main" @click="handleSwitchState">{{pageType==='login'?'注册账号': '去登陆'}}</text>
				<text class="py-3 text-light-muted">忘记密码？</text>
			</view>

			<!-- icon -->
			<view class=" flex align-center justify-center wechatlogin">
				<uni-icons custom-prefix="iconfont" class="icon-box" type="icon-weixin" size="28" color="#5ccc84">
				</uni-icons>
			</view>

			<!-- 用户协议 -->
			<view class="flex align-center justify-center mt-4" v-if="pageType==='login'">
				<checkbox-group @change="handleCheckbox">
					<label class=" text-light-muted">
						<checkbox value="cb" :checked="check" />
					</label>
				</checkbox-group>
				<text class="font ml-1 text-light-muted">已阅读并同意用户协议&隐私声明</text>
			</view>


		</view>


	</view>
</template>

<script>
	// 接口 
	import UserModel from '@/model/userModel.js'
	export default {
		data() {
			return {
				pageType: 'login', // 切换状态
				formData: { // 表单
					username: '',
					password: '',
					repassword: ''
				},
				check: false, //复选框
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

			// 登录
			async signLogin() {
				// console.log('this.check', this.check);
				if (!this.check) {
					return uni.showToast({
						title: '请先阅读并同意用户协议&隐私声明',
						icon: 'none'
					})
				}
				try {
					const data = this.lodash.cloneDeep(this.formData) //深拷贝
					delete data.repassword // 删除验证密码
					const res = await UserModel.getToLogin(data)
					// console.log('登录', res);
					this.phoneNumber(res.phone) //  判断 手机号
					this.formReset() //清空
					this.$store.dispatch('setUserInfo', res) //存本地
				} catch (e) {
					console.log(e);
				} finally {
					uni.hideLoading()
				}
			},

			// 注册
			async handleRegister() {
				try {
					const data = this.lodash.cloneDeep(this.formData) //深拷贝
					const res = await UserModel.getRegister(data)
					// console.log('注册', res);
					uni.showToast({
						title: '注册成功',
						icon: 'none'
					})
					this.pageType = 'login' //切换登录
					this.formReset() //清空

					// 返回上一页
					uni.navigateBack({
						delta: 1
					})

				} catch (e) {
					//TODO handle the exception
					console.log(e);
				} finally {
					uni.hideLoading()
				}

			},

			// 判断 手机号
			phoneNumber(phone) {
				if (!phone) {
					uni.navigateTo({ // 跳转
						url: '/pages/bind-phone/bind-phone'
					})
					return
				}
			},


			// 表单清空  
			formReset() {
				this.formData = {
					username: '',
					password: '',
					repassword: ''
				}
			},

			//  切换状态
			handleSwitchState() {
				this.pageType = this.pageType === 'login' ? 'reg' : 'login'
			},

			// 复选框状态 切换
			handleCheckbox(e) {
				// console.log('e', e.detail.value.length);
				this.check = !(!e.detail.value.length)
				// console.log('this.check', this.check);
			},


		},
		onLoad() {}
	}
</script>

<style>

</style>

// this.$refs[ref].validate().then(res => {
// console.log('success', res);
// uni.showToast({
// title: `校验通过`
// })
// }).catch(err => {
// console.log('err', err);
// })


<!-- 效验 -->
// password: [{
// required: true,
// errMessage: '请输入密码'
// },
// // {minLength:5,pattem:/^[1]([3-9])[0-9]{9}$/,errMessage:'密码不合法'},
// ]


<!-- 表单 验证 -->
<!-- required 星号显示 必填 -->
<!-- <uni-forms :modelValue="loginFormData" :rules="rules" label-position="top" ref="loginForm">

				<uni-easyinput class="input" :clearable="false" prefixIcon="person" type="text" :inputBorder="false"
					v-model.trim="loginFormData.username" placeholder="请输入用户名" />

				<uni-easyinput class="input" :clearable="false" prefixIcon="locked" :inputBorder="false" passwordIcon
					type="password" v-model.trim="loginFormData.password" placeholder="请输入密码" />

				<uni-easyinput v-if="flag" class="input" :clearable="false" prefixIcon="locked" :inputBorder="false"
					passwordIcon type="password" v-model.trim="loginFormData.repassword" placeholder="确认密码" />

				<button type="primary" class="mt-2" @click="handleToLogin(flag)">{{flag?'注册': '登录'}}</button>
			</uni-forms> -->
