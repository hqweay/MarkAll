<template>
  <div class="plugin">
    <el-row class="plugin-list" :gutter="20">
      <el-col :span="8" v-for="item in settings" :class="['plugin-item']" :key="item.id">
        <el-card
          @click.native="toSetting(item)"
          :title="item.name"
          shadow="hover"
          :class="['plugin', 'plugin-']"
        >
          <h2>{{item.name}}</h2>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { ipcRenderer } from "electron";
export default {
  data() {
    return {
      settings: [],
      loading: false
    };
  },
  created: function() {
    this.settings = require("./static/menu.json");
  },
  methods: {
    toSetting(pluginItem) {
      // if (item.type === "setting") {
      //   // setting
      // } else if (item.type === "plugin") {
      //   // plugin
      //   if (item.id === "doubanData") {
      //     this.doubanData();
      //   }
      // }
      ipcRenderer.send("showPlugin", pluginItem);
    }
  }
};
</script>

<style scoped lang="scss">
.plugin {
  cursor: pointer;
  margin: 0 auto;
  width: 90%;
  .el-row {
    margin-top: 2%;
    .el-col {
      margin-bottom: 2%;
      .plugin {
        background-color: $plugin;
      }
    }
  }
}
</style>