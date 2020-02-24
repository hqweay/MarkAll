<template>
  <div class="template-enum">
    <!-- <el-radio
      v-for="enumValue in enumItem.enums"
      :key="enumValue"
      :label="false"
      :disabled=" enumValue !== enumItem.state"
    >{{enumValue}}</el-radio>-->
    <el-radio-group>
      <el-radio-button
        v-for="enumValue in enumItem.enums"
        :key="enumValue"
        :label="enumValue"
        :disabled=" enumValue !== enumItem.state"
        v-on:click.prevent.self
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
  created() {}
}
</script>
<style lang='scss'>
</style>