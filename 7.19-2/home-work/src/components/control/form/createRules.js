
// this.formItem = createRules(this.item)

// 验证 抽离
import { validatePhone, validatePass, validateEmail } from '../../../utils/vaildate'
export const createRules = (data) => {
  // console.log('1', data)
  data.forEach(item => {
    let rulesArray = []
    // 规则 提示
    if (item.required) {
      // 验证规则 item.message
      const rule = { required: true, message: item.message || createMessage(item) }
      rulesArray.push(rule) // 添加
    }

    // 1 校验手机号
    if (item.valueType && item.valueType === 'phone') {
      const rule = { validator: validatePhone, trigger: 'change' }
      rulesArray.push(rule)
    }

    // 校验密码
    if (item.valueType && item.valueType === 'password') {
      const rule = { validator: validatePass, trigger: 'change' }
      rulesArray.push(rule)
    }

    // 校验邮箱
    if (item.valueType && item.valueType === 'eamil') {
      const rule = { validator: validateEmail, trigger: 'change' }
      rulesArray.push(rule)
    }

    // 自定义 验证提示
    if (item.rules && Array.isArray(item.rules) && item.rules.length > 0) {
      rulesArray = rulesArray.concat(item.rules)
    }
    item.rules = rulesArray
  })

  // console.log('data', data)
  return data
}
// 自动生成 效验
const createMessage = (data) => {
  let msg = ''
  switch (data.type) {
    case 'input':
      msg = '请输入'
      break
    case 'select':
      msg = '请选择'
      break
  }
  return `${msg}${data.label}`
}

// export default createRules
