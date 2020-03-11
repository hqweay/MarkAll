import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData') + '/user/';

// 若无，创建目录
async function hasFileByItemId(itemId: number) {
  try {
    await fs.ensureFile(STORE_PATH + 'images/' + itemId);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

function getFileName(fileName: string, itemId: number, count = 1): any {
  // const exists = await fs.pathExists(STORE_PATH + 'images/' + itemId + '/' + fileName);
  // if (exists) {
  //   return getFileName(fileName + '-' + count, itemId, count++).then();
  // } else {
  //   return count == 1 ? fileName : fileName + '-' + count;
  // }
  console.log("ssss");
  return fs.pathExists(STORE_PATH + 'images/' + itemId + '/' + fileName)
    .then(exists => {

      if (exists) {
        console.log("111111");
        return getFileName(fileName + '-' + count, itemId, count++);
      } else {
        console.log("22222222");
        return count == 1 ? fileName : fileName + '-' + count;
      }
    })
}


// file : [name, path]
async function copyImageToUserByFile(file: any, itemId: number) {
  try {
    let newPath: string = "";

    await fs.copy(file.path, STORE_PATH + 'images/' + itemId + '/' + newPath);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

export { getFileName }