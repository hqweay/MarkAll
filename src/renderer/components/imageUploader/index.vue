<template>
  <el-upload
    class="image-uploader"
    drag
    :auto-upload="true"
    action="http://localhost:8080/"
    :http-request="myUpload"
    multiple
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { getFileName } from "#/fs/file/index";
export default class extends Vue {
  created() {
    console.log("ssssss");
  }
  myUpload(content: any): boolean {
    console.log(content.file);
    // 复制至用户目录
    // const STORE_PATH = APP.getPath("userData");

    // fs.ensureDir(STORE_PATH + "/user")
    //   .then(() => {
    //     console.log("创建用户文件夹成功！");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // console.log(getFileName("/dd", 1));

    getFileName("1.txt", 1).then(value => {
      console.log(value);
    });

    content.onSuccess("配时文件上传成功");
    return true;
  }
}
</script>
<style lang="scss" scoped>
.image-uploader {
  height: 100px;
  width: 100px;
  // border: 2px dashed #dddddd;
}
</style>