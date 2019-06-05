// 使 renderer 和 main 都可以使用
import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块
import LodashId from 'lodash-id' // 引入 lodash 便利 lowdb 操作

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
    }
}

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
// /home/hqweay/.config/Electron

const adapter = new FileSync(path.join(STORE_PATH, '/data.json')) // 初始化lowdb读写的json文件名以及存储路径

const db = Datastore(adapter) // lowdb接管该文件

db._.mixin(LodashId) // 通过._mixin()引入

// 创建数据库,表放这里比较合适
// 模板
import templates from "./initData/template";
if (!db.has('template').value()) {
    db.set('template', templates).write();
}

// 标签
import tags from "./initData/tag";
if (!db.has('tag').value()) {
    db.set('tag', tags).write();
}

// 具体条目
import items from "./initData/item";
if (!db.has('item').value()) {
    db.set('item', items).write()
}


export default db // 暴露出去