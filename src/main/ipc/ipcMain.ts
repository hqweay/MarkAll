import {
  app,
  BrowserWindow,
  ipcMain, IpcMainEvent
} from 'electron';

import { createItemWindow } from '~/main/api/Card'
import { createAddItemWindow } from '~/main/api/item/add'

let itemWin: BrowserWindow | null;

ipcMain.on('showCardInfo', (evt: IpcMainEvent, type: string, data: any) => {

  itemWin = createItemWindow(type, data);
  itemWin.webContents.send('updateItemList', 'something');
})


// ipcMain.on('additem', (evt: IpcMainEvent) => {

//   itemInfoWindow = createAddItemWindow();

// })


ipcMain.on("updateItemList", (event: IpcMainEvent) => {
  console.log("ssssssssss"); // Prints 'whoooooooh!'
  // const items: Array<ItemType> = []
  // event.sender.send('updateItemList', items);
  // event.returnValue = items;


});