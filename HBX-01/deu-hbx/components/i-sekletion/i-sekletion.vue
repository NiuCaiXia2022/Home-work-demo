<template>
	<!-- 骨架屏 -->
	<view class="seltion" :style="getStyle" :class="getClass">

	</view>

</template>

<script>
	export default {
		name: "i-sekletion",
		props: {
			width: {
				type: [String, Number],
				default: 0
			},
			height: {
				type: [String, Number],
				default: 0
			},
			circle: {
				type: Boolean,
				default: false
			},
			nClass: {
				type: String,
				default: ''
			}


		},
		computed: {
			getStyle() {
				return `width:${this.width};height:${this.height};`
			},
			getClass() {
				let c = ''
				if (this.circle) {
					c += 'rounded-circle'
				}
				return `${c} ${this.nClass}`
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.seltion {
		background-color: rgb(245, 245, 241);
	}
</style>
