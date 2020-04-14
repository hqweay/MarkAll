<template>
  <div class="template-tag">
    <!-- <el-button plain size="small" v-for="tag in this.item.tags" :key="tag">{{tag}}</el-button> -->
    <!-- <el-tag class="template" type="success">{{item.template_name}}</el-tag> -->
    <el-tag
      :key="tag"
      v-for="tag in tags"
      :closable="isEdit"
      :disable-transitions="false"
      @click="isEdit && editTag(tag)"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>

    <el-input
      size="mini"
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="input"
      @blur="addAndEditConfirm"
      @keyup.enter.native="addAndEditConfirm"
    ></el-input>
    <el-button v-show="isEdit" size="mini" v-else class="button-new-tag" @click="showInput">+ Tag</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

// import { deleteItemByID } from "#/db/mapper/itemMapper";
// import itemMapper from "#/db/mapper/itemMapper";
// import tagMapper from "#/db/mapper/tagMapper";
// import templateMapper from "#/db/mapper/templateMapper";
import { ipcRenderer, Item } from "electron";
@Component({
  name: "template-tag"
})
export default class extends Vue {
  @Prop() tags!: Array<string>;
  @Prop() isEdit!: boolean;
  inputVisible: boolean = false;
  inputValue: string = "";

  created() {}

  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    // 有编辑、添加操作，才将数据向上传
    if (this.isEdit == false) {
      this.$emit("updateItem", this.tags);
    }
  }
  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      // @ts-ignore
      this.$refs["input"].focus();
    });
  }
  handleClose(tag: string) {
    // 删除标签
    this.tags.remove(tag);
    // this.$emit("updateItem", this.tags);
  }
  editTag(tag: string) {
    // 编辑标签
    this.tags.remove(tag);
    this.inputValue = tag;
    // this.editFlag = false;
    this.showInput();
  }
  addAndEditConfirm() {
    // 编辑与添加标签
    // 编辑通过 => 删除，再添加新元素。
    // 不可空
    if (this.inputValue.trim() === "") {
      this.inputVisible = false;
      this.inputValue = "";
      return;
    }
    // 不可重复
    if (this.tags.indexOf(this.inputValue) != -1) {
      this.inputVisible = false;
      this.inputValue = "";
      return;
    }
    this.tags.push(this.inputValue.trim());
    this.inputValue = "";
    this.inputVisible = false;
    // this.editFlag = true;
  }
}
</script>
<style lang='scss' scoped>
.template-tag {
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