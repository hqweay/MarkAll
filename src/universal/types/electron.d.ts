import logger from '#/utlis/logger';
// declare global 扩展全局变量
declare global {
  namespace NodeJS {
    interface Global {
      logger: typeof logger
    }
  }
  // var tesst: typeof logger
}