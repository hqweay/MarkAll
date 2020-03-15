<template>
  <div class="container">
    <!-- <div class="edit">
      <el-backtop :visibility-height="-200">
        <el-dropdown @command="menuClick">
          <span class="el-dropdown-link">菜单</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="d" disabled>回到顶部（默认）</el-dropdown-item>
            <el-dropdown-item command="edit">编辑</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-backtop>
    </div>-->
    <el-backtop :visibility-height="50"></el-backtop>
    <!-- 编辑 -->
    <div class="edit" @click="edit">
      <i class="el-icon-edit-outline" v-show="!isEdit"></i>
      <i class="el-icon-check" v-show="isEdit"></i>
      <!-- <el-dropdown @command="menuClick">
        <span class="el-dropdown-link">菜单</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">编辑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
    <!-- 默认第一项为 title  -->
    <div id="title">
      <h1 class="title">{{this.item.style_content[0].value[0]}}</h1>
      <div class="sub-title">
        <el-tag class="template" type="success">{{this.item.template_name}}</el-tag>
        <tagTemplate v-bind:tags="this.item.tags"></tagTemplate>
      </div>
    </div>

    <div id="style-content">
      <el-timeline>
        <el-timeline-item
          v-for="templateField in this.item.style_content"
          :key="templateField.name"
          :class="[getStyleItemType(templateField), 'style-item']"
          :timestamp="templateField.name"
          placement="top"
        >
          <!-- <el-card class="style-item-card">
            <div v-html="stylePraser(templateField)"></div>
          </el-card>-->

          <el-card>
            <!-- TEXT is deprecated-->
            <!-- <textTemplate
              v-if="templateField.type === 'TEXT'"
              :text="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></textTemplate>-->

            <listTextTemplate
              v-if="templateField.type === 'LIST_TEXT'"
              :listText="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></listTextTemplate>

            <!-- IMAGE is deprecated-->
            <!-- <imageTemplate
              v-else-if="templateField.type === 'IMAGE'"
              :imageItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></imageTemplate>-->

            <listImage
              v-else-if="templateField.type === 'LIST_IMAGE'"
              :listImage="templateField"
              :saveFloderName="getSaveFloderName(templateField)"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></listImage>

            <!-- URL is deprecated-->
            <!-- <urlTemplate
              v-else-if="templateField.type === 'URL'"
              :urlItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></urlTemplate>-->

            <listUrlTemplate
              v-else-if="templateField.type === 'LIST_URL'"
              :listUrl="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></listUrlTemplate>
            <dateTemplate
              v-else-if="templateField.type === 'DATE'"
              :dateItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></dateTemplate>
            <enumtemplate
              v-else-if="templateField.type === 'ENUM'"
              :enumItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItem"
            ></enumtemplate>
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

import tagTemplate from "@/components/templateFields/tag/index.vue";
import textTemplate from "@/components/templateFields/text/index.vue";
import listTextTemplate from "@/components/templateFields/listText/index.vue";
import imageTemplate from "@/components/templateFields/image/index.vue";
import listImage from "@/components/templateFields/listImage/index.vue";
import urlTemplate from "@/components/templateFields/url/index.vue";
import listUrlTemplate from "@/components/templateFields/listUrl/index.vue";
import dateTemplate from "@/components/templateFields/date/index.vue";
import enumtemplate from "@/components/templateFields/enum/index.vue";
@Component({
  components: {
    tagTemplate,
    textTemplate,
    listTextTemplate,
    imageTemplate,
    listImage,
    urlTemplate,
    listUrlTemplate,
    dateTemplate,
    enumtemplate
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
  isEdit: boolean = false;

  created() {
    let id = this.$route.params.id;
    this.item = getItemByID(id);

    // 深拷贝做个备份
    this.oldItem = JSON.parse(JSON.stringify(this.item));
  }

  getSaveFloderName(listImage: any): string {
    let folderId = this.item.id;
    if (folderId.length > 5) {
      folderId = folderId.substr(0, 5);
    }

    // return this.item.id + "-" + this.item.template_name + "-" + listImage.name;
    return (
      this.item.template_name +
      "-" +
      this.item.style_content[0].value +
      "-" +
      folderId
    );
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
  edit() {
    this.isEdit = this.isEdit === true ? false : true;
  }
  updateItem(newItemField: ItemFiledType) {
    // console.log(this.item.style_content);
    // if (newItemField.type === "TEXT") {
    //@ts-ignore
    _.chain(this.item.style_content).set(
      newItemField.value,
      newItemField["value"]
    );
    // } else if (newItemField.type === "DATE") {
    //   //@ts-ignore
    //   _.chain(this.item.style_content).set(
    //     newItemField.value,
    //     newItemField["value"]
    //   );
    // }
    console.log(this.item.style_content);
  }
}
</script> 

<style lang='scss' scoped>
@import "./index.scss";
</style>
