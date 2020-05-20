<template>
  <div class="plugin-user">
    <el-card shadow="always" :class="['plugin-douban']">
      <div class="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/"
          drag
          :http-request="myUpload"
          :show-file-list="false"
          multiple
        >
          <el-image style="height:100%" :src="'file://'+ avatar">
            <div slot="error" class="image-slot">
              <el-image :src="require('@/assets/images/logo.png')"></el-image>
            </div>
          </el-image>
        </el-upload>
      </div>
      <div class="intro">
        <div class="name">
          <el-input placeholder="hqweay" v-model="user.name">
            <template slot="prepend">昵称</template>
          </el-input>
        </div>
      </div>
      <el-button @click="confrim">确认修改</el-button>
    </el-card>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import imageUploader from "@/components/imageUploader/index.vue";
import { remote, ipcRenderer } from "electron";
import { copyAvatarToUser } from "#/fs/file/index";
import settingMapper from "#/db/mapper/settingMapper";

@Component({
  name: "plugin-douban",
  components: { imageUploader }
})
export default class extends Vue {
  user: any = {
    avatar: ""
  };
  avatar: string = "";
  created() {
    this.user = settingMapper.getUser();
    this.avatar = this.user.avatar;
  }

  async myUpload(content: any) {
    copyAvatarToUser(content.file).then(avatarPath => {
      this.user.avatar = avatarPath;
      // console.log("=============");
      // console.log(avatarPath);
    });
    this.avatar = content.file.path;
    // console.log(this.user.avatar);
    // this.$forceUpdate();
  }

  confrim() {
    settingMapper.setUser(this.user);
    // console.log(this.user);

    // ipcRenderer.send("eidtUserInfo");
    // 更新 user
    ipcRenderer.sendTo(
      remote.getGlobal("mainWindow").webContents.id,
      "eidtUserInfo"
    );
    this.$notify.success({
      title: "成功",
      message: "修改用户信息成功"
    });
  }
}
</script>
<style scoped lang="scss">
.plugin-user {
  margin-top: 15%;
  .el-card {
    margin: 0 auto;
    width: 80%;
    text-align: center;
    .avatar {
      text-align: center;
    }
    .intro,
    .el-button {
      margin-top: 25px;
    }
  }
}
</style>
