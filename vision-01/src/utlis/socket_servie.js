// 定义类 SocketService   单例模式

// 单例模式
export default class SocketService {
  static instance = null

  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的对象
  ws = null

  // 实例 存储回调函数
  callBackMapping = {}

  // 是否连接成功
  connected = false

  // 记录重试的次数  就是刷新
  sendRetryCount = 0

  //  服务器重新连接的次数
  connectRetryCount = 0

  // 定义连接服务器的方法
  connect() {
    // 判断
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }

    // 连接服务器
    this.ws = new WebSocket('ws://localhost:9998')

    // 监听事件 连接成功
    this.ws.onopen = () => {
      console.log('连接服务器成功')
      this.connected = true
      // 连接成功  重置为0
      this.connectRetryCount = 0
    }
    // 监听事件 连接失败  两种 1.连接服务器失败  2.连接成功后服务器关闭
    this.ws.onclose = () => {
      console.log('连接服务器失败')
      this.connected = false
      this.connectRetryCount++

      // 断网重连
      setTimeout(() => {
        // 重新调用  重新创建对象 重新连接
        this.connect()
      }, this.connectRetryCount * 500)
    }
    // 监听事件 接收到服务端发送的数据
    this.ws.onmessage = (msg) => {
      console.log('连接服务器，得到数据')
      // 服务器发送的原始数据  在msg的data中
      // console.log('msg', msg.data)

      // 接收数据的处理
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType

      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          console.log(1)
        }
      }
    }
  }

  // 回调函数注册
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 去消磨一个回调函数
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send(data) {
    // 判断有没有连接成功
    if (this.connected) {
      // 重置时间
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      // 时间会累加
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
