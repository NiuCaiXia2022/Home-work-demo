<template>
	<!-- h5 / app / 小程序-->
	<view class="content">
		<!-- 子组件 搜索框  在components 直接写  不用引用、注册 -->
		<i-search-bar></i-search-bar>

		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			style="height: 310rpx;">
			<swiper-item class="flex justify-center" v-for="(item,index) in swiper" :key="index">
				<image :src="item.src" mode="aspectFill" style="width: 720rpx;height: 300rpx;" class="rounded shadow">
				</image>
			</swiper-item>
		</swiper>

		<!-- 图标分类 -->
		<i-nav-bar :list="iconNav"></i-nav-bar>

		<!-- 优惠卷组件  coupon -->
		<i-coupon-bar></i-coupon-bar>

		<!-- 拼团 Dough -->
		<view class="dough">拼团</view>
		<!-- <i-dough-bar num="2" :title="doughNum"></i-dough-bar> -->
		<i-dough-bar num="2" ></i-dough-bar>


		<!-- 列表 -->
		<view class="lists p-2">
			<view class="lists-top flex justify-between">
				<h2>最新列表</h2>
				<text class="font-smaller text-secondary">查看全部</text>
			</view>
			<view class="lists-bottom ">
				<view class="flex mb-2" v-for="i in 4" :key="i" >
					<view class="lists-left ">
						<image src="/static/demo/cover/3.png" mode=""></image>
					</view>
					<view class="lists-right">
						<h3>uni-app实战直播App开发</h3>
						<view class="text-secondary">10人已抢</view>
						<view class=""><text class="text-danger">￥100</text><text class="text-secondary">￥299</text>
						</view>
					</view>
				</view>
			</view>

		</view>


		<!-- 热门推荐  popular-->
		<view class="popular">热门推荐</view>
		<i-dough-bar num="8" ></i-dough-bar>

		<!-- 公共列表组件 -->

	</view>

</template>

</view>

</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				swiper: [{
					src: "/static/demo/banner/banner1.png"
				}, {
					src: "/static/demo/banner/banner2.png"
				}],
				// 图标分类
				iconNav: [{
					src: "/static/demo/icon/hd.png",
					name: "活动",
				}, {
					src: "/static/demo/icon/test.png",
					name: "考试",
				}, {
					src: "/static/demo/icon/ms.png",
					name: "秒杀",
				}, {
					src: "/static/demo/icon/pt.png",
					name: "拼团",
				}, {
					src: "/static/demo/icon/course.png",
					name: "直播",
				}, {
					src: "/static/demo/icon/column.png",
					name: "专栏",
				}, {
					src: "/static/demo/icon/book.png",
					name: "电子书",
				}, {
					src: "/static/demo/icon/ask.png",
					name: "社区",
				}],
				popularNum:8 // 热门推荐   //拼团
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.search-bar {
		height: 75rpx;
	}

	.search-item {
		height: 100%;
	}

	/*  */
	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	/*   */
	
	/* <!-- 拼团 Dough --> */
	.dough{
		width: 100%;
		padding: 20rpx;
		
	}


	/* 列表  */
	.lists{
		width: 100%;
		box-sizing: border-box;
	}
	
	.lists-top {
		width: 100%;
		margin-bottom: 20rpx;
	}
	.lists-left image{
		width: 300rpx;
		height: 165rpx;
		margin-right: 10rpx;
		
	}
	.lists-right >h3{
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
