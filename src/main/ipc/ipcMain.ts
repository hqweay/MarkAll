import {
  BrowserWindow,
  ipcMain,
  IpcMainEvent
} from 'electron';

import { createItemWindow } from '~/main/api/item/info'
import { createTemplateWindow } from '~/main/api/template/info'


ipcMain.on('showCardInfo', (evt: IpcMainEvent, type: string, data: any) => {
  createItemWindow(type, data);
})

ipcMain.on('showTemplateInfo', (evt: IpcMainEvent, type: string, data: any) => {
  createTemplateWindow(type, data);
})