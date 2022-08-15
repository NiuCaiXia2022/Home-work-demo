<template>
	<!-- 优惠卷组件  coupon -->
	<view class="p-2 coupon-box ">
		<scroll-view scroll-x="true" class="scroll-row ">
			<view v-for="i in 3" :key="i" class=" flex coupon-item text-lighttext-lighttext-light">
				<view class="bg-warning flex flex-column p-2 text-light ">
					<text>￥100</text>
					<text class="font">满￥200可用</text>
				</view>
				<view hover-class="bg-hover-warning  " class="text-light coupon-text  bg-warning flex pr-2 pl-2"
					style="line-height: 130rpx;">
					领取
				</view>
			</view>
		</scroll-view>
	</view>
	
	
	
</template>

<script>
	export default {
		name:"i-coupon-bar",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.scroll-row{
		height: 130rpx;
		width: 100%;
		display: flex;
	}

	.coupon-box {
		width: 1000rpx;
		height: 130rpx;
	}

	.coupon-item {
		height: 130rpx;
		width: 310rpx;
	}

	.coupon-text {
		border-left: 1px dashed #FFF;
	}
</style>