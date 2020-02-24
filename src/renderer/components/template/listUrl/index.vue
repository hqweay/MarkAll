<template>
  <div class="template-list-url">
    <el-row class="list-container" :gutter="20">
      <el-col class="template-url" :span="12" v-for="urlItem in listUrl" :key="urlItem.url">
        <el-link @click="openUrl">
          {{urlItem.name}}
          <i class="el-icon-view el-icon--right"></i>
        </el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { openUrl } from "~/main/utils/openUrl";
@Component({
  name: "listUrl"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listUrl!: any;
  created() {}
  openUrl(url: string) {
    openUrl(url);
  }
}
</script>
<style lang='scss' scoped>
</style>