<template>
	<!-- 优惠卷组件  coupon -->
	<view class="p-2 ">
		<scroll-view scroll-x="true" class="scroll-row ">

			<view v-for="(item,index) in data" :key="index" class="conpon" style="width:550rpx;">

				<view>
					<text>￥{{item.price}}</text>
					<text class="font">{{item.value.title}}</text>
				</view>
				<view class="font">领取</view>
				
			</view>
		</scroll-view>
	</view>



</template>

<script>
	export default {
		name: "i-coupon-bar",
		props: {
			data: Array
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.conpon{
		width: 310rpx;
		display: inline-flex;
		color: #fff;
		margin-right: 30rpx;
	}
	
	.conpon>view:first-child{
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-right: 4rpx dashed;
		background-color: #d39e00;
	}
	
	.conpon>view:last-child{
		width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx !important;
		background-color: #ffc107;
	}
</style>
