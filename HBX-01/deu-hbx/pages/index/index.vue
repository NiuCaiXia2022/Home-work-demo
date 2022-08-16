<template>
	<!-- h5 / app / 小程序-->
	<view class="content">
		<!-- 子组件 搜索框  在components 直接写  不用引用、注册 -->
		<i-search-bar></i-search-bar>

		<!-- 轮播图 -->
		<i-swiper-bar :data="swiperDataList" @click="handleToDetail"></i-swiper-bar>

		<!-- 图标分类 -->
		<i-nav-bar :list="navData"></i-nav-bar>

		<!-- 优惠卷组件  coupon -->
		<i-coupon-bar :data="couponList"></i-coupon-bar>

		<!-- 拼团 Dough -->
		<view class="dough">拼团</view>
		<i-dough-bar :data="doughList"></i-dough-bar>


		<!-- 列表 -->
		<view class="w-100 p-2 flex justify-between lists-box">
			<h2>最新列表</h2>
			<text class="font-smaller text-secondary">查看全部</text>
		</view>
		<view class="p-2 list">
			<view class="flex mb-2" v-for="(item,index) in newList" :key="index">
				<view class="lists-left">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="lists-right flex justify-between flex-column p-1">
					<view class="text-ellipsis font-weight-bold ">{{item.title}}</view>
					<view class="">
						<text class="text-danger">￥{{item.price}}</text>
						<text class="text-secondary font-smaller">￥{{item.t_price}}</text>
					</view>
				</view>
			</view>

		</view>

		<!-- 公共列表组件 -->
		<image :src="img" mode="" class="bottomImg"></image>

	</view>

</template>

</view>

</template>

<script>
	import http from '@/utils/request.js'
	export default {
		data() {
			return {
				navData: [], //图标列表
				couponList: [], //优惠券coupon列表
				doughList: [], //拼团
				popularNum: 8, // 热门推荐   
				swiperDataList: [], // 轮播图列表
				newList: [], //最新列表
				img: '', //图片
				page: 1,
				usable: 1,
			}
		},
		onLoad() {
			this.getList()

		},
		methods: {
			// 所有数据
			async getList() {
				try {
					const response = await http({
						url: '/mobile/index',
						method: 'GET'
					})
					// console.log('response', response);
					this.swiperDataList = response.data.data[1].data //轮播图列表
					this.navData = response.data.data[2].data //图标列表 
					this.newList = response.data.data[5].data // 最新列表
					this.img = response.data.data[6].data //图片
					console.log('newList', this.newList);
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}

				this.getCouponList()
				this.getGroupList()
			},

			// 优惠券coupon列表
			async getCouponList() {
				const res = await http({
					url: '/mobile/coupon',
					method: 'GET'
				})
				// console.log('优惠券', res);
				this.couponList = res.data.data
			},

			// 拼团
			async getGroupList() {
				try {
					const res = await http({
						url: '/mobile/group',
						method: 'GET',
						data: {
							page: this.page,
							usable: this.usable,
						}
					})
					// console.log('拼团', res.data.data.rows);
					this.doughList = res.data.data.rows
				} catch (e) {
					//TODO handle the exception
				}

			},


			// 轮播图 点击事件
			handleToDetail(item) {
				console.log('item', item);
			},

			// 
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


	/* 拼团 Dough */
	.dough {
		width: 100%;
		padding: 15rpx;

	}


	/* 列表  */
	.lists-box{
		box-sizing: border-box;
		align-items: center;
	}
	.list {
		box-sizing: border-box;
		width: 100%;
	}

	.lists-top {
		margin-bottom: 20rpx;
	}


	.lists-left {
		width: 150px;
		height: 85px;
		margin-right: 10rpx;
	}
	.lists-left image {
		width: 150px;
		height: 85px;
	}

	.lists-right {
		width: 200px
	}
	
	/* 公共列表组件 */
	.bottomImg{
		width: 100%;
		height: 360rpx;
		margin-bottom: 100rpx;
	}
</style>
