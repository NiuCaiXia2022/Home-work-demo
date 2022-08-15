<template>
	<!-- 拼团 Dough -->
	<view class="dough-box flex flex-wrap justify-between p-2">
			<view class="dough-item" v-for="i in num" :key="i">
				<image class="dough-img" src="/static/demo/cover/1.png"></image>
				<h3>uni-app实战直播App开发</h3>
				<view class="text-secondary">10人已抢</view>
				<view class="">
					<text class="text-danger">￥100</text><text class="text-secondary">￥299</text>
				</view>
		</view>

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
			num: Number,
		}
	}
</script>

<style>
	/* 拼团 */
	.dough-box {
		width: 100%;
		box-sizing: border-box;
	}

	.dough-img {
		width: 340rpx;
		height: 190rpx;
	}

	.dough-item {
		width: 48%;
	}

	.dough-item>h3 {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
