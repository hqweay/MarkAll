<template>
  <div class="guide">
    <h2>首页与条目列表</h2>
    <el-image :src="require('@/assets/images/guide/index&itemlist.png')"></el-image>
    <h2>搜索</h2>
    <span>关键词以「mark:」开头，可以全文搜索。否则，仅通过标题搜索。</span>
    <el-image :src="require('@/assets/images/guide/fulltext-search.png')"></el-image>

    <h2>条目信息</h2>
    <el-image :src="require('@/assets/images/guide/item-info.png')"></el-image>
    <h2>条目信息添加与编辑</h2>
    <el-image :src="require('@/assets/images/guide/item-edit.png')"></el-image>
    <h2>模板信息</h2>
    <el-image :src="require('@/assets/images/guide/template-info.png')"></el-image>
    <h2>模板信息添加与编辑</h2>
    <el-image :src="require('@/assets/images/guide/template-edit.png')"></el-image>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "guide",
  components: {}
})
export default class extends Vue {}
</script>

<style scoped lang="scss">
h2 {
  color: darkblue;
}
</style>
