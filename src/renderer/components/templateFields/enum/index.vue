<template>
  <div class="template-enum">
    <!-- <el-radio
      v-for="enumValue in enumItem.enums"
      :key="enumValue"
      :label="false"
      :disabled=" enumValue !== enumItem.state"
    >{{enumValue}}</el-radio>-->
    <el-radio-group v-if="!isEdit" v-model="enumItem.value.state">
      <el-radio-button
        v-for="enumValue in enumItem.value.enums"
        :key="enumValue"
        :label="enumValue"
        :disabled=" enumValue !== enumItem.value.state"
        v-on:click.prevent.self
      ></el-radio-button>
    </el-radio-group>

    <el-radio-group
      class="edit-enum"
      v-if="isEdit"
      v-model="enumItem.value.state"
      :change="changeValue()"
    >
      <el-radio-button
        v-for="enumValue in enumItem.value.enums"
        :key="enumValue"
        :label="enumValue"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-enum"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() enumItem!: any;
  @Prop() isEdit!: boolean;
  newValue: string = "";
  created() {}
  changeValue() {
    // this.enumItem.value.state = this.newValue;
    // console.log(this.newValue);
  }
}
</script>
<style lang='scss'>
</style>