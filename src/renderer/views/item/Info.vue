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

    <div id="style-content">
      <el-timeline>
        <el-timeline-item
          v-for="styleItem in this.item.style_content"
          :key="styleItem.name"
          :class="[getStyleItemType(styleItem), 'style-item']"
          :timestamp="styleItem.name"
          placement="top"
        >
          <el-card class="style-item-card">
            <div v-html="stylePraser(styleItem)"></div>
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

import Tag from "@/components/template/tag/index.vue";
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
