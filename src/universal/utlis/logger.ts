import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块


import { APP_PATH } from '#/static/appPath'

const errorFilePath = APP_PATH.logger.ERROR_PATH;
const infoFilePath = APP_PATH.logger.INFO_PATH;


let date = new Date();

enum loggerEnum {
  main,
  render
}

class Logger {
  private type: loggerEnum;

  constructor(loggerType: loggerEnum) {
    this.type = loggerType;
    fs.ensureFile(errorFilePath)
      .then(() => {
        console.log('error log created success!')
      })
      .catch(err => {
        console.error(err)
      })
    fs.ensureFile(infoFilePath)
      .then(() => {
        console.log('info log created success!')
      })
      .catch(err => {
        console.error(err)
      })
  }

  info(info = "") {
    info = date.toLocaleString() + " : ERROR: " + info + "\n";
    console.info(info);
    fs.appendFile(infoFilePath, info)
      .catch(err => {
        console.error(err)
      })
  }

  error(info: string = "") {
    if (this.type == loggerEnum.render) {
      info = date.toLocaleString() + " : render ERROR: " + info + "\n";
    } else if (this.type == loggerEnum.main) {
      info = date.toLocaleString() + " : main ERROR: " + info + "\n";
    } else {
      info = date.toLocaleString() + " : ERROR: " + info + "\n";
    }
    console.error(info);
    fs.appendFile(errorFilePath, info)
      .catch(err => {
        console.error(err)
      })
  }
}
export { loggerEnum, Logger };