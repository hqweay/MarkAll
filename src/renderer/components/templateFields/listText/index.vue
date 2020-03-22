<template>
  <div class="template-list-text">
    <el-row v-show="!isEdit">
      <el-col
        class="col-text"
        v-show="listText.value.length === 1"
        v-for="(value,key) of listText.value"
        :key="'self-show-' + '-' + key"
      >
        <div class="grid-content bg-purple" v-show="!isEdit">{{listText.value[0]}}</div>
      </el-col>

      <el-col
        class="col-text"
        v-show="listText.value.length !== 1"
        :span="12"
        v-for="(value,key) of listText.value"
        :key="'show-' + listText.name + '-' + key"
      >
        <div class="grid-content bg-purple" v-show="!isEdit">{{listText.value[key]}}</div>
      </el-col>
    </el-row>

    <el-row class="list-text-edit" :gutter="20" v-show="isEdit">
      <el-col
        class="col-edit"
        v-show="listText.value.length === 1"
        v-for="(value,key) of listText.value"
        :key="'self-edit-' + listText.name + '-' + key"
      >
        <el-input
          @blur="editCheck(key)"
          type="textarea"
          placeholder="留空则删除"
          autosize
          v-model="listText.value[key]"
        ></el-input>
      </el-col>
      <el-col
        class="col-edit"
        v-show="listText.value.length !== 1"
        :span="12"
        v-for="(value,key) of listText.value"
        :key="'edit-' + listText.name + '-' + key"
      >
        <el-input
          @blur="editCheck(key)"
          type="textarea"
          placeholder="留空则删除"
          autosize
          v-model="listText.value[key]"
        ></el-input>
      </el-col>

      <el-col class="col-edit" :span="24" v-show="isEdit">
        <el-input
          @blur="handleInputConfirm"
          ref="editText"
          type="textarea"
          placeholder="留空则删除"
          autosize
          v-model="newText"
        ></el-input>
      </el-col>
      <el-col class="col-edit edit-button" :span="24">
        <el-button size="small" type="primary" @click="addText">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-list-text"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listText!: any;
  @Prop() isEdit!: boolean;
  newText: string = "";
  newTextVisiable: boolean = false;
  created() {}
  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit === false) {
      // 提交 date
      this.$emit("updateItem", this.listText);
    }
  }
  addText() {
    this.newTextVisiable = true;
    this.$nextTick(() => {
      // @ts-ignore
      this.$refs.editText.focus();
    });
  }
  handleInputConfirm() {
    // 不可空
    if (this.newText.trim() === "") {
      this.newTextVisiable = false;
      this.newText = "";
      return;
    }
    // 不可重复
    if (this.listText.value.indexOf(this.newText) != -1) {
      this.newTextVisiable = false;
      this.newText = "";
      return;
    }
    this.listText.value.push(this.newText.trim());
    this.newText = "";
    this.newTextVisiable = false;
  }
  editCheck(key: number) {
    // 为空就删除之
    if (this.listText.value[key].trim() === "") {
      this.listText.value.remove(this.listText.value[key]);
    }
  }
}
</script>
<style lang='scss' scoped>
.template-list-text {
  .col-edit {
    margin-bottom: 15px;
  }
  .edit-button {
    margin-bottom: 0;
  }
}
</style>