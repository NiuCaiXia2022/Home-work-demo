//  抽离组件  是对象
export const props = {
  value: {
    type: [String, Number, Array],
    default: ''
  },
  config: {
    type: Object,
    default: () => ({})
  }
}

// 是对象
export const mixin = {
  watch: {
    value: {
      handler(newValue) {
        this.val = newValue
      },
      immediate: true
    },
    config: {
      handler(val) {
        this.initOptions()
        this.initProps()
      },
      immediate: true,
      deep: true
    }
  }
}
