import {
  app,
  BrowserWindow,
  ipcMain, IpcMainEvent
} from 'electron';

import { createItemWindow } from '~/main/api/Card'



ipcMain.on('showCardInfo', (evt: IpcMainEvent, type: string, data: any) => {

  createItemWindow(type, data);


})