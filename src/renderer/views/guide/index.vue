<template>
  <div class="guide">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu class="el-menu-vertical-demo">
              <h1>Guide</h1>
              <el-menu-item>
                <router-link class="tab-item" to="/guide/index">
                  <span class="tab-link">说明与设置</span>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link class="tab-item" to="/guide/item">
                  <span class="tab-link">核心功能</span>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link class="tab-item" to="/guide/plugin">
                  <span class="tab-link">插件</span>
                </router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import settingMapper from "#/db/mapper/settingMapper";
import { remote } from "electron";
@Component({
  name: "guide",
  components: {}
})
export default class extends Vue {
  setting = settingMapper.getUser();
  created() {
    if (
      remote.getGlobal("mainWindow").webContents.id ==
        remote.getCurrentWebContents().id &&
      this.setting.guide
    ) {
      this.$router.push("/main");
    }
  }
}
</script>

<style scoped lang="scss">
html,
body,
div {
  a {
    text-decoration: none;
    font-size: 20px;
    color: black;
  }
  a:hover {
    color: #285943;
  }
  margin: 0;
  padding: 0;
  border: 0px;
  .el-menu {
    text-align: center;
    position: fixed;

    top: 25%;

    left: 60px;
    bottom: 0;

    border: none;
  }
}
</style>
