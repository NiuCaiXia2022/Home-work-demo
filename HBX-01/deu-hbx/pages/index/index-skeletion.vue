<template>
	<!-- 骨架屏 -->
	<view class="">
		<view class="p-2">
			<i-sekletion width="100%" height="80rpx"></i-sekletion>
			<i-sekletion width="100%" height="320rpx" nClass="mt-2"></i-sekletion>
		</view>
		<view class="py-2 flex flex-wrap ">
			<view v-for="item in 8" :key="item" class="flex flex-column mb-2  justify-center align-center"
				style="width:25%">
				<i-sekletion width="80rpx" height="80rpx" circle></i-sekletion>
				<i-sekletion width="88rpx" height="20rpx" nClass="mt-2"></i-sekletion>
			</view>
		</view>
		<view class="p-2 flex">
			<i-sekletion width="50%" height="130rpx" nClass="mr-2"></i-sekletion>
			<i-sekletion width="50%" height="130rpx"></i-sekletion>
		</view>
		<view class="p-2">
			<i-sekletion width="100rpx" height="50rpx"></i-sekletion>
			<view class="flex mt-2" v-for="item in 2" :key="item">
				<i-sekletion width="300rpx" height="200rpx"></i-sekletion>
				<view class="flex flex-column ml-2 ">
					<i-sekletion width="350rpx" height="35rpx"></i-sekletion>
					<i-sekletion width="100rpx" height="25rpx" nClass="mt-2"></i-sekletion>
					<i-sekletion width="150rpx" height="45rpx" nClass="mt-2"></i-sekletion>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
