<template>
  <div class="template">
    <ul class="item-list">
      <!-- v-loading.fullscreen.lock="loading" -->
      <li class="item" v-for="item in settings" :key="item.id" @click="toSetting(item)">
        <div class="container">
          <div :class="['card', item.type]">
            <span class="name">
              <h1>
                <a target="_blank">{{item.name}}</a>
              </h1>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMoviesBySpider } from "#/scripts/spider/mark-all-douban-movie";
import { importDoubanMovies } from "#/db/import/import-douban-movie";

export default {
  data() {
    return {
      settings: [],
      loading: false
    };
  },
  created: function() {
    this.settings = require("#/static/other-config.json");
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    toSetting(item) {
      if (item.type === "setting") {
        // setting
      } else if (item.type === "plugin") {
        // plugin
        if (item.id === "imdouwatched") {
          this.imDouWatched();
        }
      }
    },
    imDouWatched() {
      this.$prompt(" 请输入你的豆瓣 id", " 提示 ", {
        confirmButtonText: " 确定 ",
        cancelButtonText: " 取消 ",
        closeOnClickModal: false,
        inputValidator: function(value) {
          if (value === null) {
            return " 不能为空呀～";
          }
        }
      })
        .then(({ value }) => {
          const loading = this.$loading({
            lock: true,
            text: " 正在尝试获取并导入数据..."
          });
          getMoviesBySpider(value).then(() => {
            this.notify(" 数据获取成功！！");
            console.log(" 爬取成功！！！");
            importDoubanMovies().then(res => {
              this.notify(" 数据导入成功！！");
              loading.close();
              console.log(" 导入成功！！！");
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: " 取消输入 "
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
* {
  display: flex;
}
.template {
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item-list {
    margin-bottom: 40px;
    .item {
      margin-top: 20px;
    }
    .setting {
      background-color: #5298d1;
    }
    .plugin {
      background-color: #98bbd8;
    }
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 300px;
      height: 300px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      span {
        width: 70%;
        height: 100px;
        margin-left: 40px;
      }
      .name {
        overflow: hidden;
        white-space: normal;
      }
      position: relative;
    }
    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .container {
      padding: 2px 16px;
    }
  }
}
</style>