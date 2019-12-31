import { app, protocol, BrowserWindow, Menu, shell } from 'electron'
let contextMenu: Menu | null

function createContextMenu() {
  contextMenu = Menu.buildFromTemplate(
    [{
      label: '查看',
      submenu: [{
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            // @ts-ignore
            focusedWindow.toggleDevTools()
          }
        }
      }, {
        type: 'separator'
      }]
    }, {
      label: '窗口',
      role: 'window',
      submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        type: 'separator'
      }]
    }, {
      label: '帮助',
      role: 'help',
      submenu: [{
        label: '关于',
        click: function () {
          shell.openExternal('https://github.com/hqweay/MarkAll')
        }
      }]
    }]
  )
  Menu.setApplicationMenu(contextMenu);
}

app.on('ready', () => {
  createContextMenu()
})