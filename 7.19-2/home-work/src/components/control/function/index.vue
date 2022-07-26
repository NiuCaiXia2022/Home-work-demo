<template>
  <div>

    <!-- function -->
    <div v-html="config.callback && config.callback(data)"></div>
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
    return {}
  },
  created() { },
  computed: {},
  methods: {},
  mounted() { }
}
</script>

<style lang="scss" scoped>
</style>
