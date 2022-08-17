<template>
	<view class="p-2 list">
		<view class="flex mb-2" v-for="(item,index) in data" :key="index">
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
</template>

<script>
	export default {
		name: "i-list-bar",
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
	/* 列表  */
	.lists-box {
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
</style>
