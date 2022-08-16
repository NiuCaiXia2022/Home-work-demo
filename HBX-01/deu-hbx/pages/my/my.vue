<template>
	<view class="content">
		<!-- 头部 -->
		<!-- <view class="w-100 flex align-center justify-center top text-white ">
			<text class="flex-1"></text>
			<text class="flex-3 font-weight-bold">我的</text>
			<text class="flex-1">···</text>
		</view> -->

		<view class="home-bg"></view>


		<view class="position-relative">


			<!-- 内容 -->
			<view class="header flex p-3 ">
				<view class="header-left rounded-circle bg-light">
					<image src="" mode="" class=""></image>
				</view>
				<view class="flex flex-column pl-3 flex-1 text-white ">
					<text class="font-md mb-2" @click="handleToLogin">立即登录</text>
					<text class="font-sm">登录解锁更多功能</text>
				</view>
			</view>

			<!-- 导航 -->
			<view class="px-3 nav w-100">
				<view class="flex bg-white shadow rounded nav-box w-100">
					<view v-for="(item,index) in iconFont" :key="index"
						class="iconfont icon-OrderHistory flex-1 flex flex-column align-center justify-center py-3"
						style="font-size: 20px;">
						<uni-icons :type="item.icon" size="30" color="#febd00"></uni-icons>
						<view class="font-sm mt-1 text-secondary">{{item.text}}</view>
					</view>
				</view>
			</view>


			<!-- 列表  -->
			<view class="px-3">
				<view class="list">
					<view class="list-item  p-1" v-for="(item,index) in listIcon" :key="index">
						<view class="flex justify-between align-center w-100">

							<view>
								<uni-icons class="mr-2" :type="item.icon" size="20" color="#4396ec"></uni-icons>
								<text class="ml-1" style="font-size: 14px;">{{item.text}}</text>
							</view>
							<view>
								<uni-icons type="forward" size="20" color="#bebebe"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航 icon
				iconFont: [{
						icon: 'calendar-filled',
						text: '订单'
					},
					{
						icon: 'chat',
						text: '消息'
					},
					{
						icon: 'star',
						text: '收藏'
					},
					{
						icon: 'shop',
						text: '在学'
					}
				],
				// 列表 icon
				listIcon: [{
						icon: 'chat',
						text: '我的优惠券'
					},
					{
						icon: 'star',
						text: '常见问题'
					},
					{
						icon: 'shop',
						text: '设置'
					}
				]

			}
		},
		methods: {
			// 跳转登录
			handleToLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}

		}
	}
</script>

<style>
	/* 背景 */
	.home-bg {
		background-color: #5ccc84;
		height: 175px;
		width: 375px;
		border-bottom-left-radius: 50px;
		border-bottom-right-radius: 50px;
		position: fixed;
		left: 0;
		right: 0;
	}

	/* 头部 */
	.top {
		height: 60rpx;
		background-color: #5ccc84;
		text-align: center;
	}

	/* 内容 */

	.header {
		background-color: #5ccc84;
		color: #fff;
	}

	.header-left image {
		width: 120rpx;
		height: 120rpx;
	}

	/* 内容 */

	/* 导航 */
	.nav {
		height: 200rpx;
		box-sizing: border-box;
	}

	.nav-box {
		background-color: #fff;
	}

	/* 列表 */
	.list-item {
		position: relative;
		display: flex;
		flex-direction: row;
		padding: 12px 15px;
		padding-left: 15px;
		flex: 1;
		overflow: hidden;
		border-bottom: #bebebe solid 2rpx;
	}
</style>
