<template>
  <div class="guide">
    <h2>引导</h2>启动时跳过引导页
    <el-switch v-model="guide" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    <br />
    <el-button @click="submit" round>{{saveText}}</el-button>
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
  guide = settingMapper.isGuide();
  saveText = "保存设置并进入首页";
  created() {
    if (
      remote.getGlobal("mainWindow").webContents.id !=
      remote.getCurrentWebContents().id
    ) {
      this.saveText = "保存";
    }
  }
  submit() {
    settingMapper.setGuide(this.guide);

    if (
      remote.getGlobal("mainWindow").webContents.id ==
      remote.getCurrentWebContents().id
    ) {
      this.$router.push("/main");
    } else {
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  }
}
</script>

<style scoped lang="scss">
.el-button {
  margin-top: 20px;
}
</style>
