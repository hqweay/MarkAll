<template>
  <div class="container">
    <!-- 默认第一项为 title  -->
    <div id="title">
      <h1 class="title">{{this.item.style_content[0].value}}</h1>
      <div class="sub-title">
        <el-tag class="template" type="success">{{this.item.template_name}}</el-tag>
        <tagTemplate v-bind:tags="this.item.tags"></tagTemplate>
      </div>
    </div>

    <div id="style-content">
      <el-timeline>
        <el-timeline-item
          v-for="templateItem in this.item.style_content"
          :key="templateItem.name"
          :class="[getStyleItemType(templateItem), 'style-item']"
          :timestamp="templateItem.name"
          placement="top"
        >
          <!-- <el-card class="style-item-card">
            <div v-html="stylePraser(templateItem)"></div>
          </el-card>-->
          <el-card class="style-item-card">
            <textTemplate v-if="templateItem.type === 'TEXT'" v-bind:text="templateItem.value"></textTemplate>
            <listTextTemplate
              v-else-if="templateItem.type === 'LIST_TEXT'"
              v-bind:listText="templateItem.value"
            ></listTextTemplate>
            <imageTemplate
              v-else-if="templateItem.type === 'IMAGE'"
              v-bind:imageItem="templateItem.value"
            ></imageTemplate>
            <listImage
              v-else-if="templateItem.type === 'LIST_IMAGE'"
              v-bind:listImage="templateItem.value"
            ></listImage>
            <urlTemplate
              v-else-if="templateItem.type === 'URL'"
              v-bind:urlItem="templateItem.value"
            ></urlTemplate>
            <listUrlTemplate
              v-else-if="templateItem.type === 'LIST_URL'"
              v-bind:listUrl="templateItem.value"
            ></listUrlTemplate>
            <dateTemplate
              v-else-if="templateItem.type === 'DATE'"
              v-bind:dateItem="templateItem.value"
            ></dateTemplate>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- <div
        v-for="styleItem in this.item.style_content"
        :key="styleItem.name"
        :class="[getStyleItemType(styleItem), 'style-item']"
        v-html="stylePraser(styleItem)"
      ></div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getItemByID, editItemByID } from "#/db/mapper/itemMapper";
import { getTemplateByName } from "#/db/mapper/templateMapper";
import { stylePraser } from "@/utils/stylePraser";

import tagTemplate from "@/components/template/tag/index.vue";
import textTemplate from "@/components/template/text/index.vue";
import listTextTemplate from "@/components/template/listText/index.vue";
import imageTemplate from "@/components/template/image/index.vue";
import listImage from "@/components/template/listImage/index.vue";
import urlTemplate from "@/components/template/url/index.vue";
import listUrlTemplate from "@/components/template/listUrl/index.vue";
import dateTemplate from "@/components/template/date/index.vue";

@Component({
  components: {
    tagTemplate,
    textTemplate,
    listTextTemplate,
    imageTemplate,
    listImage,
    urlTemplate,
    listUrlTemplate,
    dateTemplate
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
  getStyleItemType(styleItem: any): string {
    return styleItem.type.toLowerCase();
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
    margin-left: 8%;
    // margin-right: 1%;
    flex-direction: column;
    #title {
      flex-direction: column;
      .sub-title {
        display: flex;
        flex-wrap: wrap;
      }
    }
    #style-content {
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
  .el-timeline {
    padding-left: 0;
  }
  .style-item-card {
    width: 90%;
  }
}
</style>
