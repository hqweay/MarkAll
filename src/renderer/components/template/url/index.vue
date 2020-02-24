<template>
  <div class="template-url">
    <el-link @click="openUrl(urlItem.url)">
      {{urlItem.name}}
      <i class="el-icon-view el-icon--right"></i>
    </el-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { openUrl } from "~/main/utils/openUrl";
@Component({
  name: "template-url"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() urlItem!: any;
  created() {}
  openUrl(url: string) {
    openUrl(url);
  }
}
</script>
<style lang='scss' scoped>
</style>