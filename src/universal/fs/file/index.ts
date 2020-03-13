import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData') + '/user/';

// 若无，创建目录
async function hasImageBySaveFolder(saveFolder: string) {
  try {
    await fs.ensureDir(STORE_PATH + 'images/' + saveFolder);
    console.log(STORE_PATH + 'images/' + saveFolder + ' exists!');
  } catch (err) {
    console.error(err);
  }
}

function getImageName(fileName: string, saveFolder: string): any {
  let fileNameArr: string[] = fileName.split('.');
  return getImageNameHelper(fileName, saveFolder, fileNameArr);
}

function getImageNameHelper(fileName: string, saveFolder: string, fileNameArr: string[], count = 0): any {
  return fs.pathExists(STORE_PATH + 'images/' + saveFolder + '/' + fileName)
    .then(exists => {
      if (exists) {
        count++;
        return getImageNameHelper(fileNameArr[0] + '-' + count + '.' + fileNameArr[1], saveFolder, fileNameArr, count);
      } else {
        return count == 0 ? fileName : fileNameArr[0] + '-' + count + '.' + fileNameArr[1];
      }
    })
}

// file : [name, path]
async function copyImageToUserByFile(file: any, saveFolder: string) {

  hasImageBySaveFolder(saveFolder);
  //@ts-ignore
  let newImage = await getImageName(file.name, saveFolder).then(function (newFileName) {
    try {
      fs.copySync(file.path, STORE_PATH + 'images/' + saveFolder + '/' + newFileName);
      console.log('image copied success!');
      let newFilePath = STORE_PATH + 'images/' + saveFolder + '/' + newFileName;
      let newImage = {
        "name": newFileName,
        "url": newFilePath,
        "description": ""
      };
      return newImage;
    } catch (err) {
      console.error(err)
    }
  });

  return newImage;
}

export { copyImageToUserByFile }