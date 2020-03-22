// 使 renderer 和 main 都可以使用
import Datastore from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import LodashId from 'lodash-id'; // 通过._mixin()引入 lodash-id
import path from 'path';
import fs from 'fs-extra';
import { app, remote } from 'electron'; // 引入remote模块
import { APP_PATH } from '#/static/appPath'
import { Logger, loggerEnum } from '../utlis/logger';

// 引入初始化数据
import { items, templates, tags } from "#/db/initData/init"

const APP = process.type === 'renderer' ? remote.app : app; // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP_PATH.db.FOLDER_PATH; //APP.getPath('userData'); // 获取electron应用的用户目录
// /home/hqweay/.config/Electron
// /home/hqweay/.config/allmark
// 确保 electron 软件文件夹存在
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(APP_PATH.STORE_PATH)) {
    fs.mkdirpSync(APP_PATH.STORE_PATH);
  }
}



class DB {
  private db: Datastore.LowdbSync<Datastore.AdapterSync>;
  private logger = new Logger();
  constructor() {
    // 确保保存用户数据的文件夹存在
    fs.ensureDir(APP_PATH.db.FOLDER_PATH)
      .then(() => {
        this.logger.info("datastore.ts execute 用户文件夹存在！");
      })
      .catch(err => {
        this.logger.error("datastore.ts execute :" + err);
      })

    const adapter = new FileSync(APP_PATH.db.DATA_PATH);

    this.db = Datastore(adapter); //lowdb接管该文件
    this.db._.mixin(LodashId); //lodash-id

    if (!this.db.has('templates').value()) {
      this.db.set('templates', templates).write();
    }
    if (!this.db.has('tags').value()) {
      this.db.set('tags', tags).write();
    }
    if (!this.db.has('items').value()) {
      this.db.set('items', items).write();
    }
  }
  // 暂且不管，后面用上。
  read() {
    return this.db.read();
  }
  // get(key = '') {
  //   return this.read().get(key).value()
  // }
  // set(key: string, value: any) {
  //   return this.read().set(key, value).write()
  // }
  // has(key: string) {
  //   return this.read().has(key).value()
  // }
  // insert(key: string, value: any): void {
  //   // @ts-ignore
  //   return this.read().get(key).insert(value).write()
  // }
  // unset(key: string, value: any): boolean {
  //   return this.read().get(key).unset(value).write()
  // }
}

export default new DB(); //暴露出去

