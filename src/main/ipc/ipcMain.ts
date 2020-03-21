import {
  BrowserWindow,
  ipcMain,
  IpcMainEvent
} from 'electron';

import { createItemWindow } from '~/main/api/item/info'



ipcMain.on('showCardInfo', (evt: IpcMainEvent, type: string, data: any) => {

  createItemWindow(type, data);

})
