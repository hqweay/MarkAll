// 没用
// 在用户目录下的 user 文件夹下创建文件夹
import fs from 'fs-extra';

import { APP_PATH } from '#/static/appPath'


// async function createFolder(directory: string) {
//   try {
//     await fs.ensureDir(APP_PATH.USER_PATH + directory);
//     console.log('create ' + directory + ' success!');
//   } catch (err) {
//     console.error(err);
//   }
// }
async function createImageFloderByItem(item: ItemType) {
  // createFolder('/images/' + item.id);
  let path = APP_PATH.IMAGE_PATH + item.id;
  try {
    await fs.ensureDir(path);
    console.log('create ' + path + ' success!');
  } catch (err) {
    console.error(err);
  }
}

export { createImageFloderByItem }