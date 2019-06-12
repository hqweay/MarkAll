<template>
  <div class="template">
    <ul class="item-list">
      <!-- v-loading.fullscreen.lock="loading" -->
      <li class="item" v-for="item in settings" :key="item" @click="toSetting(item)">
        <div class="container">
          <div class="card">
            <span class="name">
              <h1>
                <a target="_blank">{{item}}</a>
              </h1>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMoviesBySpider } from "@/../shared/scripts/spider/mark-all-douban-movie";
import { importDoubanMovies } from "@/../shared/db/import/import-douban-movie";
export default {
  data() {
    return {
      settings: [],
      loading: false
    };
  },
  created: function() {
    this.settings = require("@/../shared/static/other-config.json");
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    toSetting(tagName) {
      this.$prompt("请输入你的豆瓣 id", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputValidator: function(value) {
          if (value === null) {
            return "不能为空呀~";
          }
        }
      })
        .then(({ value }) => {
          const loading = this.$loading({
            lock: true,
            text: "正在尝试获取并导入数据..."
          });

          getMoviesBySpider(value).then(() => {
            this.notify("数据获取成功!!");
            console.log("爬取成功!!!");

            importDoubanMovies().then(res => {
              this.notify("数据导入成功!!");
              loading.close();
              console.log("导入成功!!!");
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
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
    .card {
      background-color: #98bbd8;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 300px;
      height: 300px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      .add {
        h1 {
          color: #f8ecc9;
        }
      }
      span {
        width: 70%;
        height: 100px;
        margin-left: 40px;
      }
      .name {
        overflow: hidden;
        white-space: normal;
      }
      .add {
        text-align: center;
      }
      position: relative;
      .edit {
        position: absolute;
        top: 22px;
        right: 10px;
        img {
          height: 40px;
          width: 40px;
          -webkit-transition: all 0.5s ease-out;
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
        }
        img:hover {
          height: 50px;
          width: 50px;
          -webkit-transform: rotate(-7deg);
          -moz-transform: rotate(-7deg);
          -o-transform: rotate(-7deg);
        }
      }
      .delete {
        position: absolute;
        bottom: 10px;
        right: 10px;
        img {
          height: 40px;
          width: 40px;
          -webkit-transition: all 0.5s ease-out;
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
        }
        img:hover {
          height: 50px;
          width: 50px;
          -webkit-transform: rotate(-7deg);
          -moz-transform: rotate(-7deg);
          -o-transform: rotate(-7deg);
        }
      }
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