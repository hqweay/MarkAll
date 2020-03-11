// 在用户目录下的 user 文件夹下创建文件夹
import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData') + '/user';

async function createFolder(directory: string) {
  try {
    await fs.ensureDir(STORE_PATH + directory);
    console.log('create ' + directory + ' success!');
  } catch (err) {
    console.error(err);
  }
}
async function createImageFloderByItem(item: ItemType) {
  createFolder('/images/' + item.id);
}

export { createFolder, createImageFloderByItem }