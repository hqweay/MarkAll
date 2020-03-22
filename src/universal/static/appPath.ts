import { app, remote } from 'electron'; // 引入remote模块

// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app;

const appPath = APP.getPath('userData'); // 获取electron应用的用户目录

const userFolderPath = appPath + '/user/'; // 自定义 user 目录

const logFolderPath = userFolderPath + 'log/';
const errorFilePath = logFolderPath + 'error.log';
const infoFilePath = logFolderPath + 'info.log';

const imageFolderPath = userFolderPath + 'images/';

const dbPath = userFolderPath;

const LOG = {
  FOLDER_PATH: logFolderPath,
  ERROR_PATH: errorFilePath,
  WARN_PATH: userFolderPath + 'log/warn.log',
  INFO_PATH: infoFilePath
}

const DB = {
  FOLDER_PATH: dbPath,
  DATA_PATH: dbPath + '/data.json'
}

const APP_PATH = {
  STORE_PATH: appPath,
  USER_PATH: userFolderPath,
  IMAGE_PATH: imageFolderPath,
  db: DB,
  logger: LOG
}
// /home/hqweay/.config/Electron
export {
  APP_PATH,
  userFolderPath as STORE_PATH,
  imageFolderPath as IMAGE_PATH,
}; // 暴露出去
