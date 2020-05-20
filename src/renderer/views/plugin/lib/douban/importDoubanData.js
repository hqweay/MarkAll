import { APP_PATH } from '#/static/appPath'

import itemMapper from "#/db/mapper/itemMapper";
import templateMapper from "#/db/mapper/templateMapper";
import { getMovieItem, getBookItem, getGameItem, getMusicItem } from "./resolveDoubanData";

let { createDoubanDataGetter, saveDoubanData, DoubanTypeEnum } = require('douban-getter');
// 存储路径
const STORE_PATH = APP_PATH.PLUGIN_PATH + "/doubanData";

export async function importDoubanData(douban) {

  importDoubanTemplate(douban);

  await importMovie(douban);
  await importBook(douban);
  await importMusic(douban);
  await importGame(douban);
}

function importDoubanTemplate(douban) {
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
async function importMovie(douban) {
  console.log("importMovies");
  if (douban.movie.watched) {
    // 先把之前的数据删了
    itemMapper.deleteItemByTemplateIDAndState("douban-movie-hqweay", "看过");

    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchedMovies);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMovieItem(element, "看过"));
      });
    })
  }
  if (douban.movie.watching) {
    itemMapper.deleteItemByTemplateIDAndState("douban-movie-hqweay", "在过");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchingMovies);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMovieItem(element, "在看"));
      });
    })
  }
  if (douban.movie.wish) {
    itemMapper.deleteItemByTemplateIDAndState("douban-movie-hqweay", "想看");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMovies);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMovieItem(element, "想看"));
      });
    })
  }
}
async function importBook(douban) {
  if (douban.book.read) {
    itemMapper.deleteItemByTemplateIDAndState("douban-book-hqweay", "读过");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getBookItem(element, "读过"));
      });
    })
  }
  if (douban.book.reading) {
    itemMapper.deleteItemByTemplateIDAndState("douban-book-hqweay", "在读");

    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readingBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getBookItem(element, "在读"));
      });
    })
  }
  if (douban.book.wish) {
    itemMapper.deleteItemByTemplateIDAndState("douban-book-hqweay", "想读");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getBookItem(element, "想读"));
      });
    })
  }
}
async function importMusic(douban) {
  if (douban.music.listened) {
    itemMapper.deleteItemByTemplateIDAndState("douban-music-hqweay", "听过");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listenedMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMusicItem(element, "听过"));
      });
    })
  }
  if (douban.music.listening) {
    itemMapper.deleteItemByTemplateIDAndState("douban-music-hqweay", "在听");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listeningMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMusicItem(element, "在听"));
      });
    })
  }
  if (douban.music.wish) {
    itemMapper.deleteItemByTemplateIDAndState("douban-music-hqweay", "想听");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getMusicItem(element, "想听"));
      });
    })
  }
}
async function importGame(douban) {
  if (douban.game.played) {
    itemMapper.deleteItemByTemplateIDAndState("douban-game-hqweay", "玩过");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playedGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getGameItem(element, "玩过"));
      });
    })
  }
  if (douban.game.playing) {
    itemMapper.deleteItemByTemplateIDAndState("douban-game-hqweay", "在玩");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playingGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getGameItem(element, "在玩"));
      });
    })
  }
  if (douban.game.wish) {
    itemMapper.deleteItemByTemplateIDAndState("douban-game-hqweay", "想玩");
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      data.forEach(element => {
        itemMapper.addItem(getGameItem(element, "想玩"));
      });
    })
  }
}