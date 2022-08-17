<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/common/style/free.css");
	@import url("@/common/style/animate.min.css");
	@import url("@/common/iconfont/iconfont.css");
	@import url("@/common/style/common.css");
	/* 自定义icon */
	@import "@/static/icon/iconfont.css"
</style>
