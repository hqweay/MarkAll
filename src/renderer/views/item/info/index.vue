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
        <tagTemplate :isEdit="isEdit" @updateItem="updateItemTags" v-bind:tags="this.item.tags"></tagTemplate>
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
              @updateItem="updateItemField"
            ></textTemplate>-->

            <listTextTemplate
              v-if="templateField.type === 'LIST_TEXT'"
              :listText="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></listTextTemplate>

            <!-- IMAGE is deprecated-->
            <!-- <imageTemplate
              v-else-if="templateField.type === 'IMAGE'"
              :imageItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></imageTemplate>-->

            <listImage
              v-else-if="templateField.type === 'LIST_IMAGE'"
              :listImage="templateField"
              :saveFloderName="getSaveFloderName(templateField)"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></listImage>

            <!-- URL is deprecated-->
            <!-- <urlTemplate
              v-else-if="templateField.type === 'URL'"
              :urlItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></urlTemplate>-->

            <listUrlTemplate
              v-else-if="templateField.type === 'LIST_URL'"
              :listUrl="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></listUrlTemplate>
            <dateTemplate
              v-else-if="templateField.type === 'DATE'"
              :dateItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></dateTemplate>
            <enumTemplate
              v-else-if="templateField.type === 'ENUM'"
              :enumItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></enumTemplate>
            <rateTemplate
              v-else-if="templateField.type === 'RATE'"
              :rateItem="templateField"
              :isEdit="isEdit"
              @updateItem="updateItemField"
            ></rateTemplate>
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
import { getItemByID, editItemByID, addItem } from "#/db/mapper/itemMapper";
import { getTemplateByName } from "#/db/mapper/templateMapper";
import { addTags } from "#/db/mapper/tagMapper";
// import { stylePraser } from "@/utils/stylePraser";

import tagTemplate from "@/components/templateFields/tag/index.vue";
// import textTemplate from "@/components/templateFields/text/index.vue";
import listTextTemplate from "@/components/templateFields/listText/index.vue";
// import imageTemplate from "@/components/templateFields/image/index.vue";
import listImage from "@/components/templateFields/listImage/index.vue";
// import urlTemplate from "@/components/templateFields/url/index.vue";
import listUrlTemplate from "@/components/templateFields/listUrl/index.vue";
import dateTemplate from "@/components/templateFields/date/index.vue";
import enumTemplate from "@/components/templateFields/enum/index.vue";
import rateTemplate from "@/components/templateFields/rate/index.vue";

import { resolveTemplateField } from "./utils";

import { remote, ipcRenderer } from "electron";
import _ from "lodash";
@Component({
  components: {
    tagTemplate,
    listTextTemplate,
    listImage,
    listUrlTemplate,
    dateTemplate,
    enumTemplate,
    rateTemplate
  }
})
export default class extends Vue {
  item: ItemType = {
    id: "",
    created_time: "",
    updated_time: "",
    template_name: "",
    style_content: [],
    tags: []
  };
  oldItem: ItemType = {
    id: "",
    created_time: "",
    updated_time: "",
    template_name: "",
    style_content: [],
    tags: []
  };
  isEdit: boolean = false;
  // 弃用
  // isAdd: boolean = false;

  created() {
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      this.item = getItemByID(id);
      // 深拷贝做个备份
      this.oldItem = JSON.parse(JSON.stringify(this.item));
    } else if (this.$route.params.templateName) {
      this.isEdit = true;
      let templateName = this.$route.params.templateName;
      // 先获得 template，再构造空 item
      let template = getTemplateByName(templateName);

      this.item = {
        id: "",
        created_time: "",
        updated_time: "",
        template_name: templateName,
        style_content: [],
        tags: []
      };

      // 初始化 style_content / template 的 fields
      template.style.forEach(field => {
        resolveTemplateField(this.item, field);
      });
    }
  }

  getSaveFloderName(listImage: any): string {
    let folderId = this.item.id;
    if (folderId.length > 5) {
      folderId = folderId.substr(0, 5);
    }
    return (
      this.item.template_name +
      "-" +
      // this.item.style_content[0].value +
      // "-" +
      folderId
    );
  }

  // stylePraser(styleItem: any): string {
  //   return stylePraser(styleItem);
  // }
  getStyleItemType(styleItem: any): string {
    return styleItem.type.toLowerCase();
  }

  edit() {
    this.isEdit = this.isEdit === true ? false : true;
  }
  updateItemField(newItemField: ItemFieldType) {
    _.chain(this.item.style_content).set(
      newItemField.value,
      newItemField["value"]
    );
    // if (this.isEdit == false) {
    //   this.updateItem();
    // }
  }
  async updateItemTags(newTags: Array<string>) {
    this.item.tags = newTags;
    addTags(newTags);
    // 在这 更新 tags
    // console.log("update tags");
    // this.updateItem();
  }

  @Watch("isEdit")
  updateItemWhenFinished() {
    if (this.isEdit === false) {
      this.updateItem();
    }
  }

  updateItem() {
    // 编辑
    if (this.item.id.toString() !== "") {
      // update
      this.item.updated_time = new Date().toString();
      if (editItemByID(this.item)) {
        this.$message({
          type: "info",
          message: "修改成功！"
        });
      } else {
        this.$message({
          type: "info",
          message: "修改失败～已存在了～"
        });
      }
    } else {
      // add
      this.item.created_time = new Date().toString();
      if (addItem(this.item)) {
        this.$message({
          type: "info",
          message: "添加成功！"
        });
        // this.isAdd = true;
        // 改变 meta 好了
        this.$router.push("/item/info/" + this.item.id);
      } else {
        this.$message({
          type: "info",
          message: "添加失败～已存在了～"
        });
      }
    }

    // 通知 itemList.vue 更新页面
    ipcRenderer.sendTo(
      remote.getGlobal("mainWindow").webContents.id,
      "updateItemList"
    );
  }
}
</script> 

<style lang='scss' scoped>
@import "./index.scss";
</style>
