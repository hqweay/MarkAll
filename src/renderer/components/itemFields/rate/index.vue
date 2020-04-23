<template>
  <div class="template-rate">
    <div class="rate-container">
      <el-rate
        :disabled="!isEdit"
        :show-score="!isEdit"
        text-color="#ff9900"
        v-model="rateItem.value.state"
        :max="rateItem.value.max"
      ></el-rate>
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
  @Prop() rateItem!: any;
  @Prop() isEdit!: boolean;
  created() {}
  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit === false) {
      // 提交 date
      this.$emit("updateItem", this.rateItem);
    }
  }
}
</script>
<style lang='scss'>
</style> 