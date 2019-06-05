// 使 renderer 和 main 都可以使用
import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块

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

// 创建数据库,表放这里比较合适
// 模板
if (!db.has('template').value()) {
    db.set('template', [{
        name: '书',
        style: {
            "书名": "爱的供养",
            "作者": "Hqweay",
            "出版社": "SWPU",
            "状态": "未读",
            "标记时间": "2019-02-10",
            "想法": "不错的一本书哟"
        }
    }, {
        name: '影',
        style: {
            "片名": "爱的抱抱",
            "导演": "HQqw",
            "演出": "马小跳",
            "状态": "未观看",
            "标记时间": "2019-02-10"
        }
    }, {
        name: '单曲',
        style: {
            "音乐": "菊次郎的夏天",
            "作者": "久石让",
            "状态": "听过",
            "标记时间": "2019-02-10"
        }
    }, {
        name: '专辑',
        style: {
            "名称": "Rick&Morty BGM",
            "作者": "佚名",
            "状态": "听过",
            "标记时间": "2019-02-10"
        }
    }, {
        name: '地点',
        style: {
            "地名": "火星",
            "经度": "火星没有",
            "维度": "火星没有",
            "人物": "爸爸,妈妈",
            "标记时间": "2019-02-10"
        }
    }]).write()
}

// 具体项
if (!db.has('item').value()) {
    db.set('item', [{
        template_name: "书",
        template_style: {
            "书名": "爱的供养",
            "作者": "Hqweay",
            "出版社": "SWPU",
            "状态": "未读",
            "标记时间": "2019-02-10",
            "想法": "不错的一本书哟"
        },
        tag_name: "悬疑"
    }]).write()
}

// 标签
if (!db.has('tag').value()) {
    db.set('tag', [{
        name: "悬疑"
    },
    {
        name: "童年"
    }]).write()
}

export default db // 暴露出去