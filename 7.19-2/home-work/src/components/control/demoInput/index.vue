<template>
  <div>
    <!-- <ei-input v-model="val" @input="handleInputEvent" /> -->
    <ei-input v-model="val" />
  </div>
</template>
<script>
export default {
  name: 'demoInputComponent',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  watch: {
    // 监听 父传子的值
    value: {
      handler(newValue) {
        console.log('父传子的值', newValue)
        this.val = newValue
      },
      immediate: true
    }
  },
  components: {},
  data() {
    return {
      val: ''
    }
  },
  created() {
  },
  computed: {},
  methods: {
    // 监听子组件更改值  .sync
    handleInputEvent() {
      this.$emit('update:value', this.val)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
