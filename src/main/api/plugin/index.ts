import {
  BrowserWindow,
} from 'electron';
// import logger from '~/universal/utlis/logger';

let pluginWin: BrowserWindow | null;

// pluginItem: any
export const createPluginWindow = (pluginItem: any) => {

  if (pluginWin == null) {
    pluginWin = new BrowserWindow({
      title: "插件",
      minHeight: 800,
      minWidth: 800,
      height: 800, // 高
      width: 800, // 宽
      alwaysOnTop: false,//置顶
      show: true, // 创建后是否显示
      frame: true, // 是否创建frameless窗口
      fullscreenable: true, // 是否允许全屏
      center: true, // 是否出现在屏幕居中的位置
      backgroundColor: '#fff', // 背景色，用于transparent和frameless窗口
      titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
      resizable: true, // 是否允许拉伸大小
      transparent: true, // 是否是透明窗口（仅macOS）
      vibrancy: 'ultra-dark', // 窗口模糊的样式（仅macOS）
      webPreferences: {
        backgroundThrottling: false, // 当页面被置于非激活窗口的时候是否停止动画和计时器
        nodeIntegration: true, // electron5.0 以上 fix render require is not defined
        webSecurity: false,
      }
    })

    pluginWin.on('closed', () => {
      pluginWin = null;
    })

  } else {
    pluginWin.show();
  }

  const isDevelopment = process.env.NODE_ENV !== 'production'
  const itemWinURL = isDevelopment
    ? (process.env.WEBPACK_DEV_SERVER_URL as string)
    : "markall://./index.html"

  if (pluginItem.id === "doubanData") {
    pluginWin.loadURL(itemWinURL + '#/plugin/douban');
  } else if (pluginItem.id === "user") {
    pluginWin.loadURL(itemWinURL + '#/plugin/user');
  } else if (pluginItem.id === "statistics") {
    pluginWin.loadURL(itemWinURL + '#/plugin/statistics');
  } else if (pluginItem.id === "export") {
    pluginWin.loadURL(itemWinURL + '#/plugin/export');
  } else if (pluginItem.id === "setting") {
    pluginWin.setSize(1000, 800);
    pluginWin.loadURL(itemWinURL + '#/guide');
  }
  return pluginWin;
}