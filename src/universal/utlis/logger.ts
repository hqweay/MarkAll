import fs from 'fs-extra';
import { app, remote } from 'electron';

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录

const errorFilePath = STORE_PATH + '/user/log/error.log';
const logFilePath = STORE_PATH + '/user/log/info.log';

let date = new Date();

class Logger {
  constructor() {
    fs.ensureFile(errorFilePath)
      .then(() => {
        console.log('error log created success!')
      })
      .catch(err => {
        console.error(err)
      })
    fs.ensureFile(logFilePath)
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
    fs.appendFile(logFilePath, info)
      .catch(err => {
        console.error(err)
      })
  }
  // error(type?: loggerEnum, info: string = "") {
  //   if (type == loggerEnum.render) {
  //     info = date.toLocaleString() + " : render ERROR: " + info + "\n";
  //   } else if (type == loggerEnum.main) {
  //     info = date.toLocaleString() + " : main ERROR: " + info + "\n";
  //   } else {
  //     info = date.toLocaleString() + " : ERROR: " + info + "\n";
  //   }
  //   console.error(info);
  //   fs.appendFile(errorFilePath, info)
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }
  error(info: string = "") {
    info = date.toLocaleString() + " : ERROR: " + info + "\n";
    console.error(info);
    fs.appendFile(errorFilePath, info)
      .catch(err => {
        console.error(err)
      })
  }
  errorRender(info: string = "") {
    info = date.toLocaleString() + " : render ERROR: " + info + "\n";
    this.error(info);
  }
  errorMain(info: string = "") {
    info = date.toLocaleString() + " : main ERROR: " + info + "\n";
    this.error(info);
  }
}
export default new Logger();