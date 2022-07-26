<template>
  <div>
    <!-- 动态类型渲染 -->
    {{ data[prop] }}
  </div>
</template>
<script>
export default {
  name: 'index',
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    },
    prop: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
    }
  },
  created() { },
  computed: {},
  methods: {},
  mounted() { }
}
</script>

<style lang="scss" scoped>
</style>
