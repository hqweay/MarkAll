<template>
  <div class="plugin-export">
    <el-card shadow="always" :class="['plugin-export']">
      <div class="check">
        <el-checkbox v-model="backup.data" label="数据" disabled border></el-checkbox>
        <el-checkbox v-model="backup.images" label="图片" border></el-checkbox>
        <el-checkbox v-model="backup.user" label="用户信息" border></el-checkbox>
        <el-checkbox v-model="backup.douban" label="豆瓣插件生成的数据" border></el-checkbox>
      </div>
      <div class="path">
        保存路径：
        <el-button @click="choosePath" round>{{this.storePath}}</el-button>
      </div>
      <div class="is-saved">{{this.isSaved}}</div>
      <el-button @click="save" round>确定</el-button>
    </el-card>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { APP_PATH } from "#/static/appPath";
import { ipcRenderer } from "electron";
import fs from "fs-extra";
@Component({
  name: "plugin-export",
  components: {}
})
export default class extends Vue {
  backup: any = {
    data: true,
    images: false,
    user: false,
    douban: false
  };
  storePath: string = APP_PATH.PLUGIN_PATH + "export/";
  isSaved: string = "未备份";
  created() {}
  choosePath() {
    ipcRenderer.send("open-file-dialog");

    ipcRenderer.on("selected-directory", (event, path) => {
      if (path.length === 0) {
        return;
      } else {
        this.storePath = path[0];
      }
    });
  }
  async save() {
    try {
      await fs.ensureDir(this.storePath);
      await fs.copySync(APP_PATH.db.DATA_PATH, this.storePath + "data.json");
      if (this.backup.images) {
        await fs.copySync(APP_PATH.IMAGE_PATH, this.storePath + "images");
      }
      if (this.backup.user) {
        await fs.copySync(
          APP_PATH.PLUGIN_PATH + "user",
          this.storePath + "user"
        );
      }
      if (this.backup.douban) {
        await fs.copySync(
          APP_PATH.PLUGIN_PATH + "doubanData",
          this.storePath + "douban-data"
        );
      }
      console.log("备份成功");
      this.isSaved = "已备份";
      this.$message({
        type: "success",
        message: "备份至 " + this.storePath + " 成功"
      });
    } catch (err) {
      this.$logger.error(err);
    }
    console.log(this.storePath);
  }
}
</script>
<style scoped lang="scss">
.plugin-export {
  margin: 0 auto;
  margin-top: 15%;
  .el-card {
    width: 80%;
    .path,
    .is-saved,
    .el-button {
      margin-top: 15px;
    }
  }
}
</style>
