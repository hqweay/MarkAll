import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块


import { APP_PATH } from '#/static/appPath'

const errorFilePath = APP_PATH.logger.ERROR_PATH;
const infoFilePath = APP_PATH.logger.INFO_PATH;
const warnFilePath = APP_PATH.logger.WARN_PATH;

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
    fs.ensureFile(warnFilePath)
      .then(() => {
        console.log('warn log created success!')
      })
      .catch(err => {
        console.error(err)
      })
  }

  info(info = "") {
    if (this.type == loggerEnum.render) {
      info = date.toLocaleString() + " : render INFO: " + info + "\n";
    } else if (this.type == loggerEnum.main) {
      info = date.toLocaleString() + " : main INFO: " + info + "\n";
    } else {
      info = date.toLocaleString() + " : INFO: " + info + "\n";
    }
    console.info(info);
    fs.appendFile(infoFilePath, info)
      .catch(err => {
        console.error(err)
      })
  }

  warn(info: string) {
    if (this.type == loggerEnum.render) {
      info = date.toLocaleString() + " : render WARN: " + info + "\n";
    } else if (this.type == loggerEnum.main) {
      info = date.toLocaleString() + " : main WARN: " + info + "\n";
    } else {
      info = date.toLocaleString() + " : WARN: " + info + "\n";
    }
    console.warn(info);
    fs.appendFile(warnFilePath, info)
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