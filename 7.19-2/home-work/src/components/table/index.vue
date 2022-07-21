<template>
  <!--  <el-table-column prop="name" label="姓名" width="180">
        </el-table-column> -->
  <!--  type="selection"  复选框  -->
  <!--  type="index"  label="序号"  序号  -->
  <!-- :render-header="item.renderHeader"  修改标头 -->

  <!-- @selection-change.sync="handleSelectionChange"  可以修改父组件传递的值  eslint 报错  不识别  v-bind 已废弃 。sync 指令-->
  <!-- :sortable="item.sortable"   排序 -->
  <div>
    <!-- {{ tableData }} -->
    <el-table :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange"
      @sort-change="handleSortChange">
      <el-table-column v-if="index" type="index" label="序号" width="50"></el-table-column>
      <el-table-column v-if="checkbox" type="selection" width="50"></el-table-column>

      <template v-for="(item, index) in column">
        <!-- 1 -->
        <el-table-column :key="index" :prop="item.prop" :label="item.label" :render-header="item.renderHeader"
          :sortable="item.sort" :sort-by="item.sortBy">
          <template v-slot="scope">
            <slot v-if="item.type === 'slot'" :name="item.slot_name" :data="scope.row"></slot>
            <component v-else :data="scope.row" :config="item" :prop="item.prop"
              :is="!item.type ? 'com-text' : `com-${item.type}`"></component>
            <!-- <div
              v-html="item.callback && item.callback(scope.row, index)"
            ></div> -->
          </template>
        </el-table-column>
        <!-- 2 -->
        <!-- <el-table-column
          :key="item.prop"
          v-if="item.type === 'slot'"
          :prop="item.prop"
          :label="item.label"
          :render-header="item.renderHeader"
          :sortable="item.sort"
          :sort-by="item.sortBy"
        >
          <template v-slot="scope">
            作用域插槽
            <slot :name="item.slot_name" :data="scope.row"></slot>
          </template>
        </el-table-column> -->
        <!-- 3 -->
        <!-- <el-table-column
          :key="item.label"
          v-else
          :prop="item.prop"
          :label="item.label"
          :render-header="item.renderHeader"
          :sortable="item.sort"
          :sort-by="item.sortBy"
        ></el-table-column> -->
      </template>
    </el-table>
  </div>
</template>
<script>
// 集成组件
const modules = {}
// 映射组件
const files = require.context('../control', true, /index.vue$/i)
console.log('files', files)
console.log('keys', files.keys()) // 打印Key 值
// 循环  切割
files.keys().forEach((item) => {
  const key = item.split('/')
  const name = key[1]
  // const component = files(item).default
  // console.log(name, component)
  // 添加集成组件
  modules[`com-${name}`] = files(item).default
})
console.log('modules', modules)
export default {
  // 接收父组件传递的值
  props: {
    column: {
      type: Array,
      default: () => []
    },
    checkbox: Boolean,
    index: Boolean,
    url: {
      type: String,
      default: '',
      required: true
    },
    method: {
      type: String,
      default: 'GET',
      required: true
    },
    params: {
      type: Object,
      defauil: () => { }
    },
    data: {
      type: Object,
      defauil: () => { }
    },
    initRequest: Boolean,
    onLoad: Boolean,
    format: Function,
    checkList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    // 组件可以自动生成
    ...modules
    // comFunction: () => import('../control/function/index.vue'),
    // comText: () => import('../control/text/index.vue'),
    // comImage: () => import('../control/image/index.vue')
  },
  data() {
    return {
      // table 数据
      tableData: []
    }
  },
  created() {
    this.initRequest && this.getTableList()
  },
  computed: {},
  methods: {
    // 请求
    async getTableList() {
      if (!this.url) {
        this.$message('url is required')
        return false
      }
      try {
        const requestData = {
          url: this.url,
          method: this.method
        }
        // get传参
        if (this.data) {
          requestData.data = this.data
        }
        // Post传参
        if (this.params) {
          requestData.params = this.params
        }

        const res = await this.$axios(requestData)
        this.tableData = res.data.data

        // 发送给父组件
        let data = res.data
        // console.log(res)
        if (this.format && typeof this.format === 'function') {
          data = this.format(res.data)
        }

        this.tableData = data

        this.onLoad && this.$emit('onLoad', res)
      } catch (error) {
        console.log(error)
      }
    },
    // 子传父请求
    getInitRequest() {
      console.log(12)
      console.log(this.getTableList())
      this.getTableList()
    },
    // 获取 复选框选中 整行的值
    handleSelectionChange(val) {
      console.log('子', val)
      // update:checkList' 更新父组件传过来的值
      this.$emit('update:checkList', val)
      // this.checkList = val
    },
    // 表格数据远程排序
    handleSortChange({ column, prop, order }) {
      // console.log(column当前行信息, prop当前字段, order升降)
      console.log(column, prop, order)
      const sortBy = column.sortBy
      console.log('sortBy', sortBy, order)
      console.log('sortBy', sortBy, order)
      this.$emit('', { sortBy, order })
    }
  },
  mounted() { }
}
</script>

<style lang="scss" scoped>
// {
//   id: 1,
//   title: '这是一段标题123',
//   date: '2016-05-02',
//   name: '王小虎',
//   address: '上海市普陀区金沙江路 1518 弄',
//   sex: '男'
// },
</style>
