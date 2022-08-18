<template>
	<!-- h5 / app / 小程序-->
	<view class="content">

		<!-- // 骨架屏  -->
		<index-skeletion v-if="!loadingStatus"></index-skeletion>

		<!-- 主体 -->
		<view v-else class="">
			<block v-for="(item,index) in allList" :key="index">
				<!-- 子组件 搜索框  在components 直接写  不用引用、注册 -->
				<i-search-bar v-if="item.type==='search'" :placeholder="item.placeholder"></i-search-bar>

				<!-- 轮播图 -->
				<i-swiper-bar v-else-if="item.type==='swiper'" :data="item.data" @click="handleToDetail"></i-swiper-bar>

				<!-- 图标分类 -->
				<i-nav-bar v-else-if="item.type==='icons'" :data="item.data"></i-nav-bar>

				<!-- 优惠卷组件  coupon -->
				<i-coupon-bar v-else-if="item.type==='coupon'" :data="couponList"></i-coupon-bar>

				<!--  分割线 -->
				<view v-if="item.type==='coupon'" class="divider"></view>

				<!-- 拼团 Dough -->
				<view class="dough font-weight-bold" v-if="item.type==='promotion'">
					{{item.listType==='group'?'拼团':'秒杀'}}
				</view>
				<i-dough-bar v-if="item.type==='promotion'" :data="groupFlashsale"></i-dough-bar>

				<!--  分割线 -->
				<view v-if="item.type==='promotion'" class="divider"></view>

				<!-- 列表 -->
				<view class="" v-if="item.type==='list'">
					<view class="w-100 p-2 flex justify-between lists-box col-">
						<view class="font-weight-bold">最新列表</view>
						<text class="font-smaller text-secondary mt-1">查看全部</text>
					</view>
					<i-list-bar :data="item.data"></i-list-bar>
				</view>

				<!--  分割线 -->
				<view v-if="item.type==='list'" class="divider"></view>

				<!-- 公共列表组件 -->
				<image v-if="item.type==='imageAd'" :src="item.data" class="bottomImg"></image>


			</block>

		</view>

	</view>

</template>

</view>

</template>

<script>
	// import http from '@/utils/request.js'
	// 接口
	import IndexModel from '@/model/indexModel.js'

	// 骨架屏 
	import indexSkeletion from '@/pages/index/index-skeletion.vue'

	export default {
		data() {
			return {
				allList: [], //所有数据
				couponList: [], //  优惠券coupon列表
				groupFlashsale: [], // 拼团   秒杀
				listAll: {
					page: 1,
					usable: 1,
				},
				loadingStatus: false
			}
		},
		// 下拉刷新触发的方法
		onPullDownRefresh() {
			this.loadRefresh()
		},
		onLoad() {
			// this.loadRefresh()
			this.getList()
		},
		components: {
			// 子组件注册
			indexSkeletion
		},
		methods: {
			// 下拉刷新触发的方法 onPullDownRefresh() {}
			async loadRefresh() {
				try {
					this.getList()
					// 关闭下拉刷新
					uni.stopPullDownRefresh()
				} catch (e) {
					//TODO handle the exception
					console.log(e);
					uni.stopPullDownRefresh()
				}

			},

			// 总数据
			async getList() {
				try {
					const res = await IndexModel.getMobileIndex()
					console.log('总数据', res);
					this.allList = res
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
				this.getCouponList() // 优惠券coupon列表
				this.getGroupFlashsale() // 拼团、 秒杀
				this.loadingStatus = true // 骨架屏 
			},

			// 优惠券coupon列表
			async getCouponList() {
				const res = await IndexModel.getMobileCoupon()
				this.couponList = res
			},

			// 拼团  秒杀 getMobileGroup
			async getGroupFlashsale() {
				// 过滤
				const type = this.allList.filter(item => item.type === 'promotion')[0].listType
				console.log('type', type);

				// 请求
				const res = await IndexModel.getGroupFlashsale(type, this.listAll)
				this.groupFlashsale = res.rows
			},

			// 轮播图 点击事件
			handleToDetail(item) {
				console.log('item', item);
			},

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

	/* 公共列表组件 */
	.bottomImg {
		width: 100%;
		height: 360rpx;
		margin-bottom: 100rpx;
	}


	/*  */
	.divider {
		height: 7px;
		background-color: #f5f5f3;
	}
</style>


// uni.request({
// url: 'http://demonuxtapi.dishait.cn/mobile/index',
// method: 'GET',
// header: {
// appid: 'bd9d01ecc75dbbaaefce'
// },
// // 可以使用 success 也可以使用 promise的.then接收
// // 解构赋值 [ ] 数组的形势
// }).then(res => {
// console.log('lists', res);
// })



// // 所有数据
// async getList1() {
// try {
// const response = await http({
// url: '/mobile/index',
// method: 'GET'
// })
// // 解构赋值 []=res 带测试(uni-app)
// this.swiperDataList = response.data.data[1].data //轮播图列表
// this.navData = response.data.data[2].data //图标列表
// this.newList = response.data.data[5].data // 最新列表
// this.img = response.data.data[6].data //图片
// console.log('newList', this.newList);
// } catch (e) {
// //TODO handle the exception
// console.log(e);
// }
// this.getCouponList()
// this.getGroupList()
// },

// // 优惠券coupon列表
// async getCouponList() {
// const res = await http({
// url: '/mobile/coupon',
// method: 'GET'
// })
// this.couponList = res.data.data
// },

// // 拼团
// async getGroupList() {
// try {
// const res = await http({
// url: '/mobile/group',
// method: 'GET',
// data: {
// page: this.page,
// usable: this.usable,
// }
// })
// this.doughList = res.data.data.rows
// } catch (e) {
// //TODO handle the exception
// }
// },
