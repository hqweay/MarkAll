<template>
  <div class="template-text">
    <div class="text-container" v-show="!isEdit">{{newText.value}}</div>
    <div class="edit-text" v-show="isEdit">
      <el-input placeholder="请输入内容" v-model="newText.value" clearable @change="editText"></el-input>
    </div>
  </div>
</template> 

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-text"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() text!: any;
  @Prop() isEdit!: boolean;
  newText: any = null;
  created() {
    this.newText = this.text;
  }
  editText() {
    console.log(this.newText.value);
    this.$emit("updateItem", this.newText);
  }
}
</script>
<style lang='scss'>
</style>