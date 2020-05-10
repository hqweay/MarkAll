export function getMovieItem(movie, state) {
  return {
    "created_time": new Date().toString(),
    "updated_time": new Date().toString(),
    "template_id": "douban-movie-hqweay",
    "extra_state": state,
    "style_content": [
      {
        "name": "名称",
        "type": "LIST_TEXT",
        "value": [
          movie.title
        ]
      }, {
        "name": "链接",
        "type": "LIST_URL",
        "value": [
          {
            "name": movie.url,
            "url": movie.url,
            "description": ""
          },
        ]
      }, {
        "name": "封面",
        "type": "LIST_IMAGE",
        "value": [
          {
            "name": "",
            "url": movie.pic,
            "description": ""
          },
        ]
      },
      {
        "name": "时间",
        "type": "DATE",
        "value": [
          movie.date
        ]
      },
      {
        "name": "评论",
        "type": "LIST_TEXT",
        "value": [
          movie.comment
        ]
      },
      {
        "name": "评分",
        "type": "RATE",
        "value": {
          "max": 5,
          "state": movie.rate
        }
      },
      {
        "name": "状态",
        "type": "ENUM",
        "value": {
          "enums": [
            "未看",
            "在看",
            "看过"
          ],
          "state": state
        }
      }
    ],
    "tags": movie.tags
  }
}

export function getBookItem(book, state) {
  return {
    "created_time": new Date().toString(),
    "updated_time": new Date().toString(),
    "template_id": "douban-book-hqweay",
    "extra_state": state,
    "style_content": [
      {
        "name": "名称",
        "type": "LIST_TEXT",
        "value": [
          book.title
        ]
      }, {
        "name": "链接",
        "type": "LIST_URL",
        "value": [
          {
            "name": book.url,
            "url": book.url,
            "description": ""
          },
        ]
      }, {
        "name": "封面",
        "type": "LIST_IMAGE",
        "value": [
          {
            "name": "",
            "url": book.pic,
            "description": ""
          },
        ]
      }, {
        "name": "出版商",
        "type": "LIST_TEXT",
        "value": [
          book.pub
        ]
      },
      {
        "name": "时间",
        "type": "DATE",
        "value": [
          book.date
        ]
      },
      {
        "name": "评论",
        "type": "LIST_TEXT",
        "value": [
          book.comment
        ]
      },
      {
        "name": "评分",
        "type": "RATE",
        "value": {
          "max": 5,
          "state": book.rate
        }
      },
      {
        "name": "状态",
        "type": "ENUM",
        "value": {
          "enums": [
            "读过",
            "在读",
            "想读"
          ],
          "state": state
        }
      }
    ],
    "tags": book.tags
  }
}

export function getMusicItem(music, state) {
  return {
    "created_time": new Date().toString(),
    "updated_time": new Date().toString(),
    "template_id": "douban-music-hqweay",
    "extra_state": state,
    "style_content": [
      {
        "name": "名称",
        "type": "LIST_TEXT",
        "value": [
          music.title
        ]
      }, {
        "name": "链接",
        "type": "LIST_URL",
        "value": [
          {
            "name": music.url,
            "url": music.url,
            "description": ""
          },
        ]
      }, {
        "name": "封面",
        "type": "LIST_IMAGE",
        "value": [
          {
            "name": "",
            "url": music.pic,
            "description": ""
          },
        ]
      }, {
        "name": "简介",
        "type": "LIST_TEXT",
        "value": [
          music.intro
        ]
      },
      {
        "name": "时间",
        "type": "DATE",
        "value": [
          music.date
        ]
      },
      {
        "name": "评论",
        "type": "LIST_TEXT",
        "value": [
          music.comment
        ]
      },
      {
        "name": "评分",
        "type": "RATE",
        "value": {
          "max": 5,
          "state": music.rate
        }
      },
      {
        "name": "状态",
        "type": "ENUM",
        "value": {
          "enums": [
            "听过",
            "在听",
            "想听"
          ],
          "state": state
        }
      }
    ],
    "tags": music.tags
  }
}

export function getGameItem(game, state) {
  return {
    "created_time": new Date().toString(),
    "updated_time": new Date().toString(),
    "template_id": "douban-game-hqweay",
    "extra_state": state,
    "style_content": [
      {
        "name": "名称",
        "type": "LIST_TEXT",
        "value": [
          game.title
        ]
      }, {
        "name": "链接",
        "type": "LIST_URL",
        "value": [
          {
            "name": game.url,
            "url": game.url,
            "description": ""
          },
        ]
      }, {
        "name": "封面",
        "type": "LIST_IMAGE",
        "value": [
          {
            "name": "",
            "url": game.pic,
            "description": ""
          },
        ]
      }, {
        "name": "简介",
        "type": "LIST_TEXT",
        "value": [
          game.intro
        ]
      },
      {
        "name": "时间",
        "type": "DATE",
        "value": [
          game.date
        ]
      },
      {
        "name": "评论",
        "type": "LIST_TEXT",
        "value": [
          game.comment
        ]
      },
      {
        "name": "评分",
        "type": "RATE",
        "value": {
          "max": 5,
          "state": game.rate
        }
      },
      {
        "name": "状态",
        "type": "ENUM",
        "value": {
          "enums": [
            "玩过",
            "在玩",
            "想玩"
          ],
          "state": state
        }
      }
    ],
    "tags": game.tags
  }
}