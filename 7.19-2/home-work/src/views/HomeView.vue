<template>
  <!-- <myTable :column="column" checkbox index></myTable>    checkbox 复选框  index 序号 -->
  <!--  v-slot:operation="slot" 作用域传递的值  {{ slot.data.id }} -->
  <!--
      url="/name/"  路径
      method="GET"  method
      :data="data_1"
      :params="params_1"
      init-request  初始化请求
   -->
  <div class="home">
    <!-- 子组件  -->
    <myTable
      :column="column"
      index
      checkbox
      url="/name/"
      method="GET"
      :data="data_1"
      :params="params_1"
      init-request
      ref="tabledemo"
      on-load
      @onLoad="onLoad"
      :format="formatDate"
    >
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <el-button type="danger">编辑</el-button>
        <button @click="handleDeletet">删除</button>
      </template>
    </myTable>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    myTable: () => import('../components/table/index.vue')
  },
  data() {
    return {
      // table  的表头
      column: [
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'gender' },
        { label: '创建时间', prop: 'create_date' },
        {
          label: '操作',
          prop: 'operation',
          type: 'slot',
          slot_name: 'operation'
        }
      ],
      data_1: {
        name: '一号'
      },
      params_1: {
        name: '二号'
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    // 编辑
    handleEdit(row) {
      console.log(row)
    },
    // 删除
    handleDeletet(row) {
      console.log(row)
    },
    // 回调
    onLoad(data) {
      //  获取子组件的数据
      console.log(data)
    },
    // 格式化时间
    formatDate(data) {
      // console.log('123', data)
      const tableData = data.data
      console.log('1', tableData)
      tableData.forEach((item) => {
        // console.log('item', item)
        item.gender = item.gender === '男' ? 1 : 0
      })
      console.log('23', tableData)
      return tableData
    }
  }
}
</script>
<style>
/* {
  label: '标题',
  prop: 'title',
  type: 'function',
  // 回调 返回值  return `<strong>${row.title}</strong>`
  // return row.title.replace('标题', '<strong>标题</strong>')
  callback: (row, index) => {
    if (row.id === 1) {
      return `<a href="https:''www.baidu.com">${row.title}</a>`
    }
      }
}, */

/* <myTable :column="column1" index checkbox url="/fruit/" method="GET">
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <el-button type="danger">编辑</el-button>
        <button>删除</button>
      </template>
    </myTable> */

/* 会有没有及时渲染的问题  undefined  */
/* mounted() {
    setTimeout(() => {
      console.log(this.$refs.tabledemo.getInitRequest())
      this.$refs.tabledemo.getInitRequest()
    }, 1000)
  } */
</style>
