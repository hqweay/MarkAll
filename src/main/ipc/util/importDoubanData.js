import { APP_PATH } from '#/static/appPath'
let { createDoubanDataGetter, saveDoubanData, DoubanTypeEnum } = require('douban-getter');
// 存储路径
const STORE_PATH = APP_PATH.PLUGIN_PATH + "/doubanData";

export async function importDoubanData(douban) {
  await importMovie(douban).then(() => {
    console.log("为啥呢");
  });
  await importBook(douban);
  await importMusic(douban);
  await importGame(douban);
}

async function importMovie(douban) {
  if (douban.movie.watched) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchedMovies);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "watchedMovies");
    })
  }
  if (douban.movie.watching) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchingMovies);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "watchingMovies");
    })
  }
  if (douban.movie.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMovies);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "wishMovies");
    })
  }
}
async function importBook(douban) {
  if (douban.book.read) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readBooks);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/book/", "readBooks");
    })
  }
  if (douban.book.reading) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.readingBooks);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/book/", "readingBooks");
    })
  }
  if (douban.book.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishBooks);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/book/", "wishBooks");
    })
  }
}
async function importMusic(douban) {
  if (douban.music.listened) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listenedMusics);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/music/", "listenedMusics");
    })
  }
  if (douban.music.listening) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.listeningMusics);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/music/", "listeningMusics");
    })
  }
  if (douban.music.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishMusics);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/music/", "wishMusics");
    })
  }
}
async function importGame(douban) {
  if (douban.game.played) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playedGames);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "watchedMovies");
    })
  }
  if (douban.game.playing) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.playingGames);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "watchingMovies");
    })
  }
  if (douban.game.wish) {
    let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.wishGames);
    getDoubanWatchedMovies(douban.id, douban.page.start, douban.page.end, 1000).then(function (data) {
      saveDoubanData(data, STORE_PATH + douban.id + "/movie/", "wishMovies");
    })
  }
}