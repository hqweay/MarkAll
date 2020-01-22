<template>
  <div class="tag">
    <!-- <el-button plain size="small" v-for="tag in this.item.tags" :key="tag">{{tag}}</el-button> -->
    <!-- <el-tag class="template" type="success">{{item.template_name}}</el-tag> -->
    <el-tag
      :key="tag"
      v-for="tag in tags"
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
  @Prop() tags!: Array<string>;
  inputVisible: boolean = false;
  inputValue: string = "";
  editFlag: boolean = true;
  created() {}

  showInput() {
    this.inputVisible = true;
  }
  handleClose(tag: string) {
    // 删除标签
    var index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
    this.$emit("updateMainPage", this.tags);
  }
  editTag(tag: string) {
    // 编辑标签
    var index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
    this.inputValue = tag;
    this.inputVisible = true;
    this.editFlag = false;
  }
  handleInputConfirm() {
    // 编辑与添加标签
    // 不可空
    if (this.inputValue.trim() === "") {
      this.inputVisible = false;
      return;
    }
    // 不可重复
    if (this.tags.indexOf(this.inputValue) != -1) {
      this.inputVisible = false;
      return;
    }
    this.tags.push(this.inputValue);
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
// .template,
.el-tag {
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