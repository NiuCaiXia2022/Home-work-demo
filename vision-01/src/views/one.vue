<template>
  <div class="my-seller">

    父组件
    <MyMap></MyMap>
  </div>
</template>
<script>
import MyMap from '../components/MyMap.vue'
export default {
  props: {},
  components: { MyMap },
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  methods: {},
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
