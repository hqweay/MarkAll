<template>
  <div class="tag">
    <!-- <el-button plain size="small" v-for="tag in this.item.tags" :key="tag">{{tag}}</el-button> -->
    <el-tag class="template" type="success">{{item.template_name}}</el-tag>
    <el-tag
      :key="tag"
      v-for="tag in item.tags"
      closable
      :disable-transitions="false"
      @click="editFlag && editTag(tag)"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <!-- <el-input
      size="mini"
      class="edit-tag"
      v-if="editVisible"
      v-model="inputValue"
      @keyup.enter.native="handleInputConfirm"
    ></el-input>-->

    <el-input
      size="mini"
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter.native="handleInputConfirm"
    ></el-input>
    <el-button size="mini" v-else class="button-new-tag" @click="showInput">+ Tag</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { deleteItemByID } from "#/db/mapper/itemMapper";
import { deleteTagByName } from "#/db/mapper/tagMapper";
import { deleteTemplateByName } from "#/db/mapper/templateMapper";
import { ipcRenderer, Item } from "electron";
@Component({
  name: "card"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() item!: ItemType;
  inputVisible: boolean = false;
  inputValue: string = "";
  editFlag: boolean = true;
  created() {}

  showInput() {
    this.inputVisible = true;
  }
  handleClose(tag: string) {
    var index = this.item.tags.indexOf(tag);
    if (index > -1) {
      this.item.tags.splice(index, 1);
    }
  }
  editTag(tag: string) {
    var index = this.item.tags.indexOf(tag);
    if (index > -1) {
      this.item.tags.splice(index, 1);
    }
    this.inputValue = tag;
    this.inputVisible = true;
    this.editFlag = false;
  }
  handleInputConfirm() {
    // 不可空
    if (this.inputValue.trim() === "") {
      this.inputVisible = false;
      return;
    }
    // 不可重复
    if (this.item.tags.indexOf(this.inputValue) != -1) {
      this.inputVisible = false;
      return;
    }
    this.item.tags.push(this.inputValue);
    this.inputValue = "";
    this.inputVisible = false;
    this.editFlag = true;
  }
}
</script>
<style lang='scss'>
.tag {
  display: flex;
  flex-wrap: wrap;
  span {
    margin-bottom: 1%;
  }
}
.template,
.el-tag + .el-tag {
  margin-right: 10px;
}
.button-new-tag,
.edit-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag,
.edit-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>