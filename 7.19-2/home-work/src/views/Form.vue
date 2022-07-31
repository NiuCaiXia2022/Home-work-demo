<template>
  <!-- <myFrom :item="FormItem" :rules="formRules" 验证 :field="formField" 内容></myFrom>  -->
  <div>
    <myFrom :item="FormItem" :field="formField" :button="formButton" :before-submit="handleSubmit"></myFrom>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    myFrom: () => import('../components/form')
  },
  data() {
    // 自定义 密码验证机制   rule-规则  value-内容  callback-提示
    // const validateName = (rule, value, callback) => {
    //   if (value && value !== '100') {
    //     callback(new Error('请输入字符100'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 按钮
      formButton: [
        // { label: '提交', key: 'submit', type: 'primary', size: 'mini', loading: true loading 加载},
        { label: '提交', key: 'submit', type: 'primary', size: 'mini' },
        { label: '重置', key: 'cancel', type: 'danger', size: 'small', callback: () => { this.handleRest() } },
        { label: '下一个', key: 'next', type: 'success' }
      ],
      // 表头属性
      FormItem: [
        {
          label: '手机号',
          type: 'input',
          prop: 'phone',
          required: true, // 验证规则
          valueType: 'phone',
          props: {
            label: 'class_name',
            value: 'id'
          }
          // rules: [ // 自定义规则
          //   {
          //     min: 2,
          //     max: 10,
          //     message: '请输入3-10个字符',
          //     trigger: 'change'
          //   },
          //   { validator: validateName, trigger: 'change' }
          // ]
        },
        // {
        //   label: '教室1',
        //   type: 'select',
        //   prop: 'class_room1',
        //   required: true,
        //   // 给链接 请求异步接口
        //   initRequest: true, // 请求
        //   props: {
        //     label: 'class_name',
        //     value: 'id'
        //   },
        //   url: '/classroom/',
        //   method: 'GET'
        // },
        {
          label: '交通工具',
          type: 'radio',
          prop: 'car',
          required: true,
          // 更改 options 属性  重新赋值   可以自动识别
          props: { label: 'a', value: 'b' },
          options: [
            { a: '火车', b: '1' },
            { a: '高铁', b: '2' },
            { a: '飞机', b: '3' }
          ]
        },
        {
          label: '日期',
          type: 'date',
          prop: 'createDate',
          // model: 'date',
          placeholder: '请选择生日',
          rangeSeparator: '至', // 间隔时间的中间 修改
          model: 'datetimerange',
          format: 'yyyy-MM-dd', // 时间格式 时分秒
          valueFormat: 'yyyy-MM-dd HH:mm:ss', // 选择时间格式
          disabledDateRules: (time) => {
            // return time.getTime() < new Date() // 今天之前禁用
            return time.getTime() > new Date() - 86400000 // 今天之后禁用
            // return time.getTime() < new Date()
          },
          // disabledDate: true, // 是否开启 过期时间禁用
          // disabledToDay: true, // 是否开启 过期时间 + 今天 禁用
          startPlaceholder: '请选择开始创建的日期',
          endPlaceholder: '请选择开始结束的日期',
          required: true
        },
        {
          label: '食物',
          type: 'checkbox',
          prop: 'food',
          required: true,
          // 更改 options 属性  重新赋值   可以自动识别
          props: { label: 'a', value: 'b' },
          options: [
            { a: '苹果', b: '1' },
            { a: '香蕉', b: '2' },
            { a: '樱桃', b: '3' },
            { a: '西瓜', b: '4' },
            { a: '水蜜桃', b: '5' }
          ]
        },
        {
          label: '教室',
          type: 'select',
          prop: 'class_room',
          required: true,
          // 更改 options 属性  重新赋值   可以自动识别
          props: { label: 'a', value: 'b' },
          options: [
            { a: '一教', b: '1' },
            { a: '二教', b: '2' },
            { a: '三教', b: '3' },
            { a: '四教', b: '4' },
            { a: '五教', b: '5' },
            { a: '六教', b: '6' },
            { a: '七教', b: '7' },
            { a: '八教', b: '8' },
            { a: '九教', b: '9' }
          ]
        }
      ],
      // 内容 type类型
      formField: {
        phone: '13412341234',
        password: '',
        age: '',
        email: '',
        food: ['1', '4'],
        car: '1',
        createDate: ''
      }

    }
  },
  created() {
  },
  computed: {

  },
  methods: {
    // 重置
    handleRest() {
      alert('表单重置完成!!!')
    },
    // 提交
    handleSubmit() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('this.formField', this.formField)
          resolve()
          // reject()
        }, 2000)
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
// 验证
// formRules: {
//   name: [
//     {
//       required: true, message: '必填'
//     }
//   ],
//   password: [
//     {
//       required: true, message: '必填'
//     }
//   ]
// }

// message: '密码不能为空' // 自动添加验证  createMessage.js
// {
//    label: '密码',
//    type: 'input',
//    prop: 'password',
//    required: true // 验证规则
//    // message: '密码不能为空' // 自动添加验证  createMessage.js
//  },

// // 表头属性
// FormItem: [
// {
//    label: '密码',
//    type: 'input',
//    prop: 'password'
//    // valueType: 'password'
//    // required: true // 验证规则
//  },
//  {
//    label: '邮箱',
//    type: 'input',
//    prop: 'email'
//    // valueType: 'email'
//    // required: true // 验证规则
//  }

//  label: '教室',
//           type: 'select',
//           prop: 'class_room',
//           required: true,
//           // 更改 options 属性  重新赋值   可以自动识别
//           props: { label: 'a', value: 'b' },
//           options: [
//             { a: '一教', b: '1' },
//             { a: '二教', b: '2' },
//             { a: '三教', b: '3' },
//             { a: '四教', b: '4' },
//             { a: '五教', b: '5' },
//             { a: '六教', b: '6' },
//             { a: '七教', b: '7' },
//             { a: '八教', b: '8' },
//             { a: '九教', b: '9' }
//           ]
</style>
