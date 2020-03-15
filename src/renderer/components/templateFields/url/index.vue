<template>
  <div class="template-url">
    <el-link v-if="!isEdit" @click="openUrl(urlItem.value.url)">
      {{urlItem.name}}
      <i class="el-icon-view el-icon--right"></i>
    </el-link>

    <div v-if="isEdit" class="edit-url">
      <el-input placeholder="请输入内容" v-model="urlItem.value.name">
        <template slot="prepend">NAME</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="urlItem.value.url">
        <template slot="prepend">URL</template>
      </el-input>
    </div>
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
  @Prop() isEdit!: boolean;
  created() {}
  openUrl(url: string) {
    openUrl(url);
  }
}
</script>
<style lang='scss' scoped>
</style>