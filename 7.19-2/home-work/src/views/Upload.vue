<template>
  <div>
    <h3>文件上传</h3>
    <hr>
    <!-- 文件上传 -->
    <input type="file" @change="handleSelectFile" />

    <el-button type="primary" size="mini" @click="handleUpload">文件上传</el-button>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  props: {},
  components: {},
  data() {
    return {
      files: ''
    }
  },
  created() {
  },
  computed: {},
  methods: {
    // 选择文件后 触发
    handleSelectFile(event) {
      console.log('1', event.target.files[0])
      // 获取上传的文件
      this.files = event.target.files[0]
    },
    // 点击上传
    handleUpload() {
      console.log('this.files', this.files)
      // 文件大小
      const size = this.files.size
      // 限制文件大小
      const targetSize = 1024 * 1024 * 2
      // 文件类型
      const type = this.files.type

      // 上传的文件不能大于2MB
      if (size > targetSize) {
        this.$message.error('上传的文件不能大于2MB')
      }

      // 上传的文件只能是png
      if (!/png|jpg|jpeg|gif/i.test(type)) {
        this.$message.error('上传的文件只能是png')
        return false
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
</style>
