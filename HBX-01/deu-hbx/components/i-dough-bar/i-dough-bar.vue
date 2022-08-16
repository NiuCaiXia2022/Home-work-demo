<template>
	<!-- 拼团 Dough -->
	<view class="p-2 ">
		<scroll-view scroll-x="true" class="scroll-row w-100">

			<view v-for="(item,index) in data" :key="index" class="coupon scroll-row-item">
				<view >
					<view class="dough-item">
						<image :src="item.cover"></image>
					</view>
					<view>
						<view class="text-ellipsis font-weight-bold">{{item.title}}</view>
						<view>
							<text class="text-danger">￥{{item.price}}</text>
							<text class="text-secondary font-smaller">￥{{item.t_price}}</text>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "i-dough-bar",
		data() {
			return {

			};
		},
		props: {
			data: Array,
		}
	}
</script>

<style>
	/* 拼团 */
	.coupon {
		width: 310rpx;
		height: 280rpx;
		display: inline-block;
		margin-right: 30rpx;
	}

	.dough-item {
		width: 320rpx;
		height: 180rpx;
	}

	.dough-item image {
		width: 100%;
		height: 100%;
	}
</style>
