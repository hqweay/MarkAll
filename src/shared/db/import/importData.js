import { app, remote } from 'electron' // 引入remote模块
const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块
const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
const fs = require('fs-extra')




// import { getMovies } from '../../scripts/spider/mark-all-douban-movie'
import { importDoubanMovie } from './import-douban-movie'

// /home/hqweay/.config/Electron
export function importData() {
    // With a callback:

    // getMovies();
    importDoubanMovie();
    // fs.readJson(STORE_PATH + '/douban-hqweay.json', (err, data) => {
    //     if (err) console.error(err)

    //     console.log(data)
    //     data.forEach(element => {
    //         console.log(element)
    //     });
    // })


}
