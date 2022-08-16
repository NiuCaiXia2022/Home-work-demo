<template>
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
		style="height: 310rpx;">
		<swiper-item class="flex justify-center" v-for="(item,index) in data" :key="index">
			<image @click="handleToDetail(item)" :src="item.src" style="width: 710rpx;height: 300rpx;"
				class="rounded shadow">
			</image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "i-swiper-bar",
		props: {
			data: Array,
		},
		data() {
			return {

			};
		},
		methods: {
			handleToDetail(item) {
				this.$emit('clock', item)
			}
		}
	}
</script>

<style>
	swiper {
		height: 300rpx;
		width: 100%;
	}

	swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
</style>
