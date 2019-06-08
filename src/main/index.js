import {
  app,
  BrowserWindow,
  Menu
} from 'electron'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// const winURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080`
//   : `file://${__dirname}/index.html`


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let mainWindow


console.log(winURL);
console.log("=====")
// let a = 'file://${__dirname}/index.html';
// console.log(a);
// 打印错误信息
// mainWindow.webContents.openDevTools()

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800, // 高
    width: 1280, // 宽
    maxHeight: 800,
    minHeight: 600,
    maxWidth: 1400,
    minWidth: 1180,
    show: true, // 创建后是否显示
    frame: true, // 是否创建frameless窗口
    fullscreenable: false, // 是否允许全屏
    center: true, // 是否出现在屏幕居中的位置
    backgroundColor: '#fff', // 背景色，用于transparent和frameless窗口
    titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
    resizable: true, // 是否允许拉伸大小
    transparent: true, // 是否是透明窗口（仅macOS）
    vibrancy: 'ultra-dark', // 窗口模糊的样式（仅macOS）
    webPreferences: {
      backgroundThrottling: false // 当页面被置于非激活窗口的时候是否停止动画和计时器
    }
    // ... 以及其他可选配置
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}



// app 掌管整个应用的相关事件 (钩子)
// 闭包写法 cool
app.on('ready', () => {
  createWindow()
})

// 引入菜单
import menu from './utils/menu'