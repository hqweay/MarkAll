<template>
  <div class="container">
    <!-- 默认第一项为 title  -->
    <div id="title">
      <h1 class="title">{{this.item.style[0].value}}</h1>
      <!-- <div style="margin-bottom:2%;" class="template"> -->
      <!-- <el-tag size="small" type="success">{{this.item.template_name}}</el-tag> -->
      <!-- </div> -->

      <div class="tag">
        <!-- <el-button plain size="small" v-for="tag in this.item.tags" :key="tag">{{tag}}</el-button> -->
        <el-tag type="success">{{this.item.template_name}}</el-tag>
        <el-tag
          :key="tag"
          v-for="tag in this.item.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          size="mini"
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button size="mini" v-else class="button-new-tag" @click="showInput">+ Tag</el-button>
      </div>
    </div>
    <div id="style">
      <div
        v-for="styleItem in this.item.style"
        :key="styleItem.name"
        :class="getStyleType(styleItem)"
        v-html="stylePraser(styleItem)"
      ></div>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getItemByID, editItemByID } from "#/db/mapper/itemMapper";
import { getTemplateByName } from "#/db/mapper/templateMapper";
import { stylePraser } from "@/utils/stylePraser";
const SCHEMA = {};
// import { checkJson } from "@/utils/checkJson";
@Component({
  components: {}
})
export default class extends Vue {
  template: TemplateType = {
    name: "",
    style: []
  };
  item: ItemType = {
    id: "",
    template_name: "",
    style_content: [],
    tags: []
  };
  oldItem: ItemType = {
    id: "",
    template_name: "",
    style_content: [],
    tags: []
  };
  inputVisible: boolean = false;
  created() {
    let id = this.$route.params.id;
    this.item = getItemByID(id);
    this.template = getTemplateByName(this.item.template_name);

    // 可视化渲染 json

    // this.schema = templatePraseSchema(this.template);

    // 深拷贝做个备份
    // this.oldItem = JSON.parse(JSON.stringify(this.item));
  }

  stylePraser(styleItem: any): string {
    return stylePraser(styleItem);
  }
  getStyleType(styleItem: any): string {
    return styleItem.type;
  }
  getTags(tags: any): string {
    let strs = "";
    for (let tag in tags) {
      strs += tag + "/";
    }
    return strs;
  }
}
</script> 

<style scoped lang="scss">
* {
  display: flex;

  .container {
    margin-left: 2%;
    margin-right: 2%;
    flex-direction: column;
    #title {
      flex-direction: column;
    }
    #style {
      flex-direction: column;
      * {
        flex-direction: column;
        margin-top: 2%;
      }
      .TEXT,
      .LIST_TEXT,
      .DATE,
      .IMAGE,
      .URL {
        flex-direction: row;
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
