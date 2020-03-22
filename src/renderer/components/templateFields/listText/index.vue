<template>
  <div class="template-list-text">
    <el-row class="list-text" v-show="!isEdit">
      <el-col
        class="col-text"
        :span="textWidth"
        v-for="(value,key) of listText.value"
        :key="'show-' + listText.name + '-' + key"
      >
        <div class="grid-content bg-purple" v-show="!isEdit">{{listText.value[key]}}</div>
      </el-col>
    </el-row>

    <el-row class="list-text-edit" :gutter="20" v-show="isEdit">
      <el-col
        :span="textWidth"
        class="col-edit"
        v-for="(value,key) of listText.value"
        :key="'self-edit-' + listText.name + '-' + key"
      >
        <el-input
          @blur="editCheck(key)"
          type="textarea"
          placeholder="留空则删除"
          autosize
          @keyup.ctrl.enter.native="editCheck(key)"
          v-model="listText.value[key]"
        ></el-input>
      </el-col>

      <el-col class="col-edit" :span="24" v-show="isEdit">
        <el-input
          @blur="addText"
          ref="addText"
          type="textarea"
          placeholder="添加"
          autosize
          @keyup.ctrl.enter.native="addText"
          v-model="newText"
        ></el-input>
      </el-col>
      <!-- <el-col class="col-edit edit-button" :span="24">
        <el-button size="small" type="primary" @click="addText">添加</el-button>
      </el-col>-->
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
  textWidth: number = 12;
  newText: string = "";
  created() {
    if (this.listText.value.length === 1) {
      this.textWidth = 24;
    } else {
      this.textWidth = 12;
    }
  }
  @Watch("listText", { deep: true })
  changeTextWidth() {
    if (this.listText.value.length === 1) {
      this.textWidth = 24;
    } else {
      this.textWidth = 12;
    }
  }

  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit === false) {
      // 提交 date
      this.$emit("updateItem", this.listText);
    }
  }
  // addText() {
  //   this.$nextTick(() => {
  //     // @ts-ignore
  //     this.$refs.editText.focus();
  //   });
  // }
  addInputFocus() {
    this.$nextTick(() => {
      // @ts-ignore
      this.$refs.addText.focus();
    });
  }
  addText() {
    console.log(this.newText);
    // 不可空
    if (this.newText.trim() === "") {
      this.newText = "";
      return;
    }
    // 不可重复
    if (this.listText.value.indexOf(this.newText) != -1) {
      this.newText = "";
      this.addInputFocus();
      return;
    }
    this.listText.value.push(this.newText.trim());
    this.newText = "";
    this.addInputFocus();
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