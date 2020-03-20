<template>
  <div class="template-list-image">
    <el-row class="list-container" :gutter="20">
      <!-- <el-col
        class="template-image"
        :span="6"
        v-for="imageItem in listImage.value"
        :key="imageItem.name"
      >-->
      <el-col
        class="template-image"
        style="width: 147px;"
        v-for="imageItem in listImage.value"
        :key="imageItem.name"
      >
        <!-- <div class="demonstration">{{imageItem.name}}</div> -->

        <!-- <el-image :src="require('/home/hqweay/.config/markall/user/images/60/11-1.jpg.jpg')"></el-image> -->
        <div v-if="isEdit" class="delete" @click="delteImage(imageItem)">
          <i class="el-icon-close"></i>
        </div>
        <!-- <el-image
          @click="imageOperation(imageItem)"
        >-->
        <el-image
          v-bind:class="{ 'hover-delete': isEdit }"
          v-if="isLocal(imageItem.url)"
          :src="'file://'+ imageItem.url"
          :lazy="true"
        >
          <div slot="error" class="image-slot">
            <el-image :src="require('@/assets/images/error.png')"></el-image>
          </div>
          <div slot="placeholder" class="image-slot">
            <el-image :src="require('@/assets/images/loading.png')"></el-image>
          </div>
        </el-image>

        <!-- <img v-if="isLocal(imageItem.url)" :src="imageItem.url" alt /> -->

        <el-image
          v-bind:class="{ 'hover-delete': isEdit }"
          v-if="!isLocal(imageItem.url)"
          :src="imageItem.url"
          :lazy="true"
        >
          <div slot="error" class="image-slot">
            <el-image :src="require('@/assets/images/error.png')"></el-image>
          </div>
          <div slot="placeholder" class="image-slot">
            <el-image :src="require('@/assets/images/loading.png')"></el-image>
          </div>
        </el-image>
      </el-col>

      <el-col class="template-image" :span="6" v-show="isEdit">
        <i class="el-icon-close delete" style="visibility:hidden"></i>
        <!-- <keep-alive> -->
        <imageUploader
          :listImage="listImage"
          :saveFloderName="saveFloderName"
          @updateListImage="updateUI"
        ></imageUploader>
        <!-- </keep-alive> -->
      </el-col>
    </el-row>
    <!-- <div class="edit-list-image" v-if="isEdit"> -->

    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import imageUploader from "@/components/imageUploader/index.vue";

@Component({
  name: "template-list-image",
  components: {
    imageUploader
  }
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listImage!: Array<any>;
  @Prop() isEdit!: boolean;
  @Prop() saveFloderName!: string;
  created() {}
  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit === false) {
      // 提交 date
      // console.log(this.dateItem.value);
      this.$emit("updateItem", this.listImage);
    }
  }
  isLocal(url: string): boolean {
    let reg = new RegExp("^((https|http|ftp|rtsp|mms)?://)");
    if (reg.test(url)) {
      // console.log("ulr: " + url);
      return false;
    } else {
      // console.log("nono: " + url);
      return true;
    }
  }
  updateUI(newImage: any) {
    // console.log(newImage);
    //@ts-ignore
    this.listImage.value.push(newImage);
  }
  delteImage(imageItem: any) {
    //@ts-ignore
    this.listImage.value.remove(imageItem);
  }
  // imageOperation(imageItem: any) {
  //   if (this.isEdit) {
  //     //@ts-ignore
  //     this.listImage.value.remove(imageItem);
  //   }
  // }
}
</script>
<style lang='scss' scoped>
.template-image {
  // margin: 0;
  // line-height: 100px;
  // margin-top: 15px;
  // &:nth-child(-n + 4) {
  //   margin-top: 0;
  // }
  // .hover-delete:hover {
  //   opacity: 0.3;
  //   transition: 1s;
  // }

  .delete {
    z-index: 10;
    position: relative;
    // top: px;
    font-size: 18px;
    color: red;
    left: 92%;
    top: 13px;
    cursor: pointer;
  }
  .delete:hover {
    // opacity: 0.3;
    color: black;
    transition: 1s;
  }
}
</style>