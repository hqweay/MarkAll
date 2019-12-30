// 使 renderer 和 main 都可以使用
import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块
import LodashId from 'lodash-id' // 引入 lodash 便利 lowdb 操作

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
// /home/hqweay/.config/Electron

let user = 'hqweay'
// 初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/user/douban-' + user + '.json'))
const db = Datastore(adapter) // lowdb接管该文件

if (!db.has('douban-movie').value()) {
  db.set('douban-movie', []).write()
}

export default db // 暴露出去
