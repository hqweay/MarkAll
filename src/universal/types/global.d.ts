// declare global 扩展全局变量
import { Logger } from '#/utlis/logger';

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger
    }
  }
  // var tesst: typeof logger
  interface Array<T> {
    remove(obj: any): void
  }
}
declare namespace _ {
}