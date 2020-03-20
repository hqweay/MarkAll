<template>
  <div class="template-date">
    <div class="date-container" v-show="!isEdit">
      <!-- {{
      date.getFullYear() +
      " 年 " +
      date.getMonth() +
      " 月 " +
      date.getDay() +
      " 日"
      }}-->
      {{dateItem.value[0]}}
    </div>
    <div class="edit-text" v-show="isEdit">
      <el-date-picker v-model="dateItem.value[0]" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-date"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  // prop 传递是值传递 oh yeah
  @Prop() dateItem!: any;
  @Prop() readonly isEdit!: boolean;
  // date: Date = new Date();
  created() {
    // this.date = new Date(this.dateItem.value);
  }

  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit === false) {
      // 提交 date
      // console.log(this.dateItem.value);
      this.$emit("updateItem", this.dateItem);
    }
  }
}
</script>
<style lang='scss'>
</style>