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

function getImageName(fileName: string, itemId: number): any {
  let fileNameArr: string[] = fileName.split('.');
  return getImageNameHelper(fileName, itemId, fileNameArr);
}

function getImageNameHelper(fileName: string, itemId: number, fileNameArr: string[], count = 1): any {
  return fs.pathExists(STORE_PATH + 'images/' + itemId + '/' + fileName)
    .then(exists => {
      if (exists) {
        count++;
        return getImageNameHelper(fileNameArr[0] + '-' + count + '.' + fileNameArr[1], itemId, fileNameArr, count);
      } else {
        return count == 1 ? fileName : fileNameArr[0] + '-' + count + '.' + fileNameArr[1];
      }
    })
}

// file : [name, path]
async function copyImageToUserByFile(file: any, itemId: number) {
  try {
    getImageName(file.name, itemId).then()

    let newPath: string = "";

    await fs.copy(file.path, STORE_PATH + 'images/' + itemId + '/' + newPath);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

export { getImageName }