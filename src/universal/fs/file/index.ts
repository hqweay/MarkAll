import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData') + '/user/';

// 若无，创建目录
async function hasImageByItemId(itemId: number) {
  try {
    await fs.ensureDir(STORE_PATH + 'images/' + itemId);
    console.log(STORE_PATH + 'images/' + itemId + ' exists!');
  } catch (err) {
    console.error(err);
  }
}

function getImageName(fileName: string, itemId: number): any {
  let fileNameArr: string[] = fileName.split('.');
  return getImageNameHelper(fileName, itemId, fileNameArr);
}

function getImageNameHelper(fileName: string, itemId: number, fileNameArr: string[], count = 0): any {
  return fs.pathExists(STORE_PATH + 'images/' + itemId + '/' + fileName)
    .then(exists => {
      if (exists) {
        count++;
        return getImageNameHelper(fileNameArr[0] + '-' + count + '.' + fileNameArr[1], itemId, fileNameArr, count);
      } else {
        return count == 0 ? fileName : fileNameArr[0] + '-' + count + '.' + fileNameArr[1];
      }
    })
}

// file : [name, path]
async function copyImageToUserByFile(file: any, itemId: number) {

  hasImageByItemId(itemId);
  //@ts-ignore
  getImageName(file.name, itemId).then(function (newFileName) {
    try {
      fs.copySync(file.path, STORE_PATH + 'images/' + itemId + '/' + newFileName);
      console.log('image copied success!');
      return true;
    } catch (err) {
      console.error(err)
    }

  });
}

export { copyImageToUserByFile }