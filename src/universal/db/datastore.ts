// 使 renderer 和 main 都可以使用
import Datastore from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import LodashId from 'lodash-id'; // 通过._mixin()引入 lodash-id
import path from 'path';
import fs from 'fs-extra';
import { app, remote } from 'electron'; // 引入remote模块


// 创建数据库,表放这里比较合适
// 模板
// import templates from './initData/template'

// 标签
// import tags from './initData/tag'

// 具体条目
const items = require('./initData/items.json');
//import items from './initData/item' // 引入 lodash 便利 lowdb 操作
const templates = require('./initData/templates.json');
const tags = require('./initData/tags.json');

const APP = process.type === 'renderer' ? remote.app : app; // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData'); // 获取electron应用的用户目录
// /home/hqweay/.config/Electron
// /home/hqweay/.config/allmark
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
  }
}


console.log(STORE_PATH);

class DB {
  private db: Datastore.LowdbSync<Datastore.AdapterSync>;
  constructor() {

    // 创建 user 文件夹 保存相关数据
    // fs.ensureDir(STORE_PATH + '/user', err => {
    //   console.log(err);
    // })
    fs.ensureDir(STORE_PATH + '/user')
      .then(() => {
        // console.log("创建用户文件夹成功！");
      })
      .catch(err => {
        console.log(err);
      })

    const adapter = new FileSync(path.join(STORE_PATH, '/user/data.json')); // 初始化lowdb读写的json文件名以及存储路径


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

