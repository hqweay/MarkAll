import itemMapper from "#/db/mapper/itemMapper";
import templateMapper from "#/db/mapper/templateMapper";

import { APP_PATH } from '#/static/appPath'
const STORE_PATH = APP_PATH.PLUGIN_PATH + "/doubanData";

export async function importDoubanData(douban: any) {
  importDoubanTemplate(douban);
  resolveDoubanData(douban);
}

function importDoubanTemplate(douban: any) {
  if (douban.movie.watched || douban.movie.watching || douban.movie.wish) {
    let movieTemplate = require("./doubanTemplate/movie.json");
    templateMapper.addTemplate(movieTemplate);
  }
  if (douban.book.read || douban.book.reading || douban.book.wish) {
    let bookTemplate = require("./doubanTemplate/book.json");
    templateMapper.addTemplate(bookTemplate);
  }
  if (douban.music.listened || douban.music.listening || douban.music.wish) {
    let musicTemplate = require("./doubanTemplate/music.json");
    templateMapper.addTemplate(musicTemplate);
  }
  if (douban.game.played || douban.game.playing || douban.game.wish) {
    let gameTemplate = require("./doubanTemplate/game.json");
    templateMapper.addTemplate(gameTemplate);
  }

}
function resolveDoubanData(douban: any) {
  // 先删除所有 douban Data
  if (douban.movie.watched || douban.movie.watching || douban.movie.wish) {
    let movieTemplate = require("./doubanTemplate/movie.json");
    templateMapper.addTemplate(movieTemplate);
  }
  if (douban.book.read || douban.book.reading || douban.book.wish) {
    let bookTemplate = require("./doubanTemplate/book.json");
    templateMapper.addTemplate(bookTemplate);
  }
  if (douban.music.listened || douban.music.listening || douban.music.wish) {
    let musicTemplate = require("./doubanTemplate/music.json");
    templateMapper.addTemplate(musicTemplate);
  }
  if (douban.game.played || douban.game.playing || douban.game.wish) {
    let gameTemplate = require("./doubanTemplate/game.json");
    templateMapper.addTemplate(gameTemplate);
  }
}