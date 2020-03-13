<template>
  <el-upload
    class="image-uploader"
    drag
    :auto-upload="true"
    action="http://localhost:8080/"
    :http-request="myUpload"
    :show-file-list="false"
    multiple
  >
    <i class="el-icon-upload"></i>
    <!-- <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>-->
    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { copyImageToUserByFile } from "#/fs/file/index";

@Component({
  name: "image-uploader"
})
export default class extends Vue {
  @Prop() saveFloderName!: string;
  // test!: "ssssss";
  created() {
    // console.log("created");
  }
  async myUpload(content: any) {
    let newImage = await copyImageToUserByFile(
      content.file,
      //@ts-ignore
      this.saveFloderName
    );
    // console.log(newImage);
    this.$emit("updateListImage", newImage);
    content.onSuccess("配时文件上传成功");
    return true;
  }
}
</script>
<style lang="scss" >
.image-uploader {
  // border: 2px dashed #dddddd;
}
.el-upload-dragger {
  width: 130px;
  height: 130px;

  .el-icon-upload {
    margin: 30px 0 10px;
  }
}
</style>