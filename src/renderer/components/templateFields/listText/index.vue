<template>
  <div class="template-list-text">
    <el-row v-show="!isEdit">
      <el-col :span="12" v-for="text in listText.value" :key="text">
        <div class="grid-content bg-purple" v-show="!isEdit">{{text}}</div>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-show="isEdit">
      <el-col :span="24">
        <el-button size="small" type="primary" @click="addText">添加</el-button>
      </el-col>
      <el-col :span="12" v-show="newTextVisiable">
        <el-input
          @blur="handleInputConfirm"
          ref="editText"
          type="textarea"
          placeholder="留空则删除"
          autosize
          v-model="newText"
        ></el-input>
      </el-col>

      <el-col :span="12" v-for="(value,key) of listText.value" :key="key">
        <el-input
          @blur="editCheck(key)"
          type="textarea"
          placeholder="留空则删除"
          autosize
          v-model="listText.value[key]"
        ></el-input>
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
  addText() {
    this.newTextVisiable = true;
    this.$nextTick(() => {
      this.$refs.editText.focus();
    });

    console.log();
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
<style lang='scss'>
.el-col {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>