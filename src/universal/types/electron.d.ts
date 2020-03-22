import { Logger } from '#/utlis/logger';
// declare global 扩展全局变量
declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger
    }
  }
  // var tesst: typeof logger
}