<template>
  <!-- disabled 禁用-->
  <!-- <button disabled class="my-button my-button-primary  is-border is-round"> -->
  <!-- 父传子 :class 接收 typeem 样式  isRound 变圆角 isBorder 边框按钮 -->
  <!-- <button class="my-button " :class="[typeem]"> -->
  <!-- <button :disabled="disabled" class="my-button " :class="[typeem, isRound, isBorder]"> -->
  <!-- <button :disabled="disabled" class="my-button my-button-medium " :class="[typeem, isRound, isBorder]"> -->
  <button @click="change" :disabled="disabled || loading" :style="[minWidthCss]" class="my-button my-button-medium"
    :class="[typeem, isRound, isBorder, isSize, blockCss]">
    <span>
      <!-- <i v-if="prefix" class="iconfont icon-eye-close icon-prefix" :class="[iconPrefix]"></i> -->
      <i v-if="loading" class="iconfont icon-loading icon-prefix"></i>
      <i v-if="prefix" class="iconfont icon-eye-close icon-prefix" :class="[iconPrefix]"></i>
      <slot></slot>
      <!-- <i v-if="suffix" class="iconfont icon-eye-close icon-suffix" :class="[iconSuffix]"></i> -->
      <i v-if="suffix" class="iconfont icon-eye-close icon-suffix" :class="[iconSuffix]"></i>
    </span>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      // 背景样式
      type: String,
      default: ''
    },
    minWidth: {
      // 最小宽度
      type: String,
      default: '95px'// 最小宽度
    },
    round: Boolean, // 圆角
    border: Boolean, // 边框
    disabled: Boolean, // 禁用
    size: { // 按钮类型
      type: String,
      default: ''
    },
    prefix: { // 间距
      type: String,
      default: ''
    },
    suffix: { // 间距
      type: String,
      default: ''
    },
    block: Boolean, // 块级元素
    loading: Boolean // loading
  },
  components: {},
  data() {
    return {}
  },
  created() { },
  computed: {
    // 计算属性 实现
    typeem() {
      // 接收 样式
      console.log(this.type)
      return this.type ? `my-button-${this.type}` : ''
    },
    isRound() {
      // 接收 变圆角
      console.log(this.type)
      return this.round ? 'is-round' : ''
    },
    isBorder() {
      return this.border ? 'is-border' : ''
    },
    isSize() {
      return this.size ? `my-buttom-${this.size}` : ''
    },
    minWidthCss() {
      if (!this.minWidth) return ''
      return { minWidth: this.minWidth }
    },
    iconSuffix() {
      return this.suffix ? `icon-${this.suffix}` : ''
    },
    iconPrefix() {
      return this.prefix ? `icon-${this.prefix}` : ''
    },
    blockCss() {
      return this.block ? 'my-button-block' : ''
    }
  },
  methods: {
    // 点击事件  子传父 $emit
    change() {
      this.$emit('click')
    }
  },
  mounted() { }
}
</script>

<style lang="scss" scoped>
$primary: #409eff ;
$danger: #e6a23c;
$success: #00d100;
$warning: #f56c6c;

.my-button {
  border-width: 1px;
  border-style: solid;
  border-color: #dcdfe6;
  height: 40px;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;

  // 兄弟选择器 (+)  、边距
  +.my-button {
    margin-left: 14px;
    margin-bottom: 10px;
  }

  // 子元素
  >span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  // 前子属性 间距
  .icon-prefix {
    margin-right: 10px;
  }

  // 后子属性 间距
  .icon-suffix {
    margin-left: 10px;
  }
}

// 中型按钮
.my-button-medium {
  height: 38px;
}

// 小型按钮
.my-button-small {
  height: 32px;
  padding: 0 15px;
  font-size: 12px;
}

// 最小型按钮
.my-button-mini {
  height: 28px;
  padding: 0 15px;
  font-size: 12px;
}

// 边框 按钮
.my-button-primary {
  // background-color: $primary;
  background-color: $primary;
  border-color: $primary;
  color: #fff;

  &.is-border {
    background-color: transparent;
    color: $primary;
  }
}

.my-button-success {
  // background-color: $success;
  background-color: $success ;
  border-color: $success;
  color: #fff;

  &.is-border {
    background-color: transparent;
    color: $success
  }
}

.my-button-danger {
  // background-color: $danger;
  background-color: $danger;
  border-color: $danger;
  color: #fff;

  &.is-border {
    background-color: transparent;
    color: $danger;
  }
}

.my-button-warning {
  // background-color: $warning;
  background-color: $warning;
  border-color: $warning;
  color: #fff;

  &.is-border {
    background-color: transparent;
    color: $warning;
  }
}

// 圆角
.is-round {
  border-radius: 100px;
}

// 禁用
.my-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

// 块级按钮
.my-button-block {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 0;
}

// loading动画加载
.icon-loading {
  // loading 动画名称 、2S 2秒、  infinite 无限 、 linear 匀速
  animation: loading 2s infinite linear;
}

// 动画时长
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
