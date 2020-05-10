<template>
  <div class="plugin-douban">
    <el-card shadow="always" :class="['plugin-douban']">
      <div class="id">
        豆瓣 ID：
        <el-input placeholder="hqweay" v-model="douban.id"></el-input>
      </div>
      <div class="page">
        <!-- <el-slider v-model="douban.page" range show-stops :max="300"></el-slider> -->
        导入范围（按页）：
        <el-input type="number" placeholder="开始页" v-model="douban.page.start"></el-input>

        <el-input type="number" placeholder="结束页" v-model="douban.page.end"></el-input>
      </div>
      <div class="options">
        <!-- <div class="check-all">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            border
          >全选</el-checkbox>
        </div>-->
        <div class="movie">
          <el-checkbox v-model="douban.movie.watched" label="看过影视" border></el-checkbox>
          <el-checkbox v-model="douban.movie.watching" label="在看影视" border></el-checkbox>
          <el-checkbox v-model="douban.movie.wish" label="想看影视" border></el-checkbox>
        </div>
        <div class="book">
          <el-checkbox v-model="douban.book.read" label="读过书籍" border></el-checkbox>
          <el-checkbox v-model="douban.book.reading" label="在读书籍" border></el-checkbox>
          <el-checkbox v-model="douban.book.wish" label="想读书籍" border></el-checkbox>
        </div>
        <div class="music">
          <el-checkbox v-model="douban.music.listened" label="听过音乐" border></el-checkbox>
          <el-checkbox v-model="douban.movie.listening" label="在听音乐" border></el-checkbox>
          <el-checkbox v-model="douban.movie.wish" label="想听音乐" border></el-checkbox>
        </div>
        <div class="game">
          <el-checkbox v-model="douban.game.played" label="玩过游戏" border></el-checkbox>
          <el-checkbox v-model="douban.game.plsying" label="在玩游戏" border></el-checkbox>
          <el-checkbox v-model="douban.game.wish" label="想玩游戏" border></el-checkbox>
        </div>
      </div>
      <el-button @click="doubanData" round>开始导入</el-button>
    </el-card>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// @ts-ignore
import { importDoubanData } from "./importDoubanData";
import { ipcRenderer } from "electron";
@Component({
  name: "plugin-douban",
  components: {}
})
export default class extends Vue {
  douban: any = {
    id: "hqweay",
    page: { start: 1, end: 2 },
    movie: {
      watched: false,
      watching: false,
      wish: false
    },
    book: {
      read: false,
      reading: false,
      wish: false
    },
    music: { listened: false, listening: false, wish: false },
    game: { played: false, playing: false, wish: false }
  };
  created() {}
  doubanData() {
    if (this.douban.id.trim() == "") {
      this.$message({
        type: "error",
        message: "ID 不能为空"
      });
      return;
    }
    if (this.douban.page.end < this.douban.page.start) {
      this.$message({
        type: "error",
        message: "页数范围出错"
      });
      return;
    }
    const loading = this.$loading({
      lock: true,
      text: " 正在尝试获取并导入数据..."
    });
    importDoubanData(this.douban).then(() => {
      console.log("导入成功");
      loading.close();
    });

    // 浏览器端会报错，到 background 使用
    // ipcRenderer.send("importDouban", this.douban);
    // loading.close();
  }
}
</script>
<style scoped lang="scss">
.plugin-douban {
  margin: 0 auto;
  margin-top: 15%;
  .el-card {
    width: 80%;
    div {
      margin-bottom: 20px;
    }
    .id,
    .page {
      display: flex;
      .el-input {
        margin-right: 20px;
        width: 30%;
      }
    }
    .options {
      .el-checkbox {
        margin: 0;
        margin-right: 15px;
      }
      .div {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
