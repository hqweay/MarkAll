// 在 background.ts 引入
import { loggerEnum, Logger } from '#/utlis/logger';

global.logger = new Logger(loggerEnum.main);;

