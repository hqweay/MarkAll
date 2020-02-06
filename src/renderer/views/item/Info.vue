<template>
  <div class="container">
    <!-- 默认第一项为 title  -->
    <div id="title">
      <h1 class="title">{{this.item.style_content[0].value}}</h1>
      <div class="sub-title">
        <el-tag class="template" type="success">{{this.item.template_name}}</el-tag>
        <Tag v-bind:tags="this.item.tags"></Tag>
      </div>
    </div>
    <div id="style">
      <div
        v-for="styleItem in this.item.style_content"
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

import Tag from "@/components/style/Tag.vue";
@Component({
  components: {
    Tag
  }
})
export default class extends Vue {
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
      .URL,
      .LIST_URL {
        flex-direction: row;
      }
    }
  }
  h1 {
    // margin-bottom: 1%;
  }
  .sub-title {
    display: flex;
    flex-wrap: wrap;
  }
  // .template {
  //   width: 100%;
  //   margin-bottom: 2%;
  //   // margin-top: 0;
  // }
}
</style>
