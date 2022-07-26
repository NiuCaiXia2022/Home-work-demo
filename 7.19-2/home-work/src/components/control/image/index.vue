<template>
  <div>
    <!-- image -->
    <img :src="data[prop]" width="80" height="80" />
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
