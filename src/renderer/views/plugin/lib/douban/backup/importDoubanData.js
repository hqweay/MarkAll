import { APP_PATH } from '#/static/appPath'

import itemMapper from "#/db/mapper/itemMapper";
import templateMapper from "#/db/mapper/templateMapper";
import { getMovieItem } from "./resolveDoubanData";

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
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "watchedMovies");
      data.forEach(element => {
        // itemMapper.addItem(getMovieItem(element, "看过"));
      });
    })
  }
  if (douban.movie.watching) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchingMovies);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "watchingMovies");
      data.forEach(element => {
        itemMapper.addItem(getMovieItem(element, "在看"));
      });
    })
  }
  if (douban.movie.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMovies);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "wishMovies");
      data.forEach(element => {
        itemMapper.addItem(getMovieItem(element, "想看"));
      });
    })
  }
}
async function importBook(douban) {
  if (douban.book.read) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/book/", "readBooks");
    })
  }
  if (douban.book.reading) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readingBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/book/", "readingBooks");
    })
  }
  if (douban.book.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishBooks);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/book/", "wishBooks");
    })
  }
}
async function importMusic(douban) {
  if (douban.music.listened) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listenedMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/music/", "listenedMusics");
    })
  }
  if (douban.music.listening) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listeningMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/music/", "listeningMusics");
    })
  }
  if (douban.music.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMusics);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/music/", "wishMusics");
    })
  }
}
async function importGame(douban) {
  if (douban.game.played) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playedGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "watchedMovies");
    })
  }
  if (douban.game.playing) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playingGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "watchingMovies");
    })
  }
  if (douban.game.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishGames);
    await getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1500).then(function (data) {
      // saveDoubanData(data, STORE_PATH + "/" + douban.id + "/movie/", "wishMovies");
    })
  }
}