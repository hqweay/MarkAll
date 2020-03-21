import { app, Menu } from 'electron'
let contextMenu: Menu | null
import { mainMenuTemplate } from '~/main/application/mainMenuTemplate'
function createMaintMenu() {

  contextMenu = Menu.buildFromTemplate(
    // @ts-ignore
    mainMenuTemplate
  )
  Menu.setApplicationMenu(contextMenu);
}

app.on('ready', () => {
  createMaintMenu()
})