import {
  BrowserWindow,
} from 'electron';

let itemWin: BrowserWindow | null;

// type: string, data: any
export const createItemWindow = (type: string, data: any) => {
  if (itemWin == null) {
    itemWin = new BrowserWindow({
      title: "条目详情",
      minHeight: 800,
      minWidth: 800,
      height: 800, // 高
      width: 800, // 宽
      alwaysOnTop: true,//置顶
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
    itemWin.loadURL('http://localhost:8080/#/item/info/' + data.id);

    itemWin.on('closed', () => {
      itemWin = null;
    })


  } else {
    itemWin.show();
  }
}