<template>
	<!-- 图标分类 -->
	<view class="flex flex-wrap py-2">
		<view class="flex flex-column align-center justify-center py-1" style="width: 25%;" v-for="(item,index) in data"
			:key="index">
			<image :src="item.src" mode="widthFix" style="width: 70rpx;height: 70rpx;border-radius: 100%;"></image>
			<view class="font-sm text-muted mt-1">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "i-nav-bar",
		data() {
			return {

			};
		},
		props: {
			data: Array
		}
	}
</script>

<style>

</style>
