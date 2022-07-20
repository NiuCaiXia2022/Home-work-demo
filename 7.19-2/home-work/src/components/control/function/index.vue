<template>
  <div>
    function
    <div v-html="item.callback && item.callback(scope.row, index)"></div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
