// 参考 example.js
// let createDoubanDataGetter = require('./markall-douban-data-getter-func-creater');

import createDoubanDataGetter from 'markall-douban-data-getter-func-creater'

// 存储路径
const STORE_PATH = 'douban-data-backup/';

let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");

getDoubanWatchedMovies("hqweay", STORE_PATH);