<template>
	<view class="search-bar py-2 px-1">
		<!-- 搜索 -->
		<view style="background-color: #F5F5F1;color: #928E8A;"
			class="flex align-center justify-center py-2 rounded  search-item">
			<uni-icons color="#928E8A" type="search" size="20"></uni-icons>
			<text class="title ml-2">{{placeholder}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "i-search-bar",
		props: {
			placeholder: {
				type: String,
				default: '请输入要搜索的内容'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
