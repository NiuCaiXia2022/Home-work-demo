// 定义 两个主题 切换的值

const theme = {
  // 1
  chalk: {
    backgroundColor: '#161522', // 背景颜色
    titleColor: '#ffffff', // 标题文字颜色
    themeSrc: 'qiehuan_dark.png', // 切换按钮图片
    headerBorderSrc: 'header_border_dark.png'// 页面顶部边框
  },

  // 2
  vintage: {
    backgroundColor: '#ffffff', // 背景颜色
    titleColor: '#000000', // 标题文字颜色
    themeSrc: 'qiehuan_light.png', // 切换按钮图片
    headerBorderSrc: 'header_border_linght.png'// 页面顶部边框
  }
}

export function getThemeValue(themeName) {
  return theme[themeName]
}
