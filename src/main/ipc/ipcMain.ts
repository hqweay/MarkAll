import {
  dialog,
  ipcMain,
  IpcMainEvent
} from 'electron';

import { createItemWindow } from '~/main/api/item/info'
import { createTemplateWindow } from '~/main/api/template/info'
import { createPluginWindow } from '~/main/api/plugin/index'

ipcMain.on('showCardInfo', (evt: IpcMainEvent, type: string, data: any) => {
  createItemWindow(type, data);
})

ipcMain.on('showTemplateInfo', (evt: IpcMainEvent, type: string, data: any) => {
  createTemplateWindow(type, data);
})

ipcMain.on('showPlugin', (evt: IpcMainEvent, pluginItem: any) => {
  createPluginWindow(pluginItem);
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files: any) => {
    if (files) {
      event.sender.send('selected-directory', files)
    }
  })
})
