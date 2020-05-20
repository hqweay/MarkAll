<template>
  <div class="guide">
    <h2>插件列表</h2>
    <el-image :src="require('@/assets/images/guide/plugin-list.png')"></el-image>
    <h2>豆瓣数据导入</h2>
    <el-image :src="require('@/assets/images/guide/plugin-douban.png')"></el-image>
    <h2>用户</h2>
    <el-image :src="require('@/assets/images/guide/plugin-user.png')"></el-image>
    <h2>统计</h2>
    <el-image :src="require('@/assets/images/guide/statistics-01.png')"></el-image>
    <el-image :src="require('@/assets/images/guide/statistics-02.png')"></el-image>
    <h2>数据导出</h2>
    <el-image :src="require('@/assets/images/guide/data-export.png')"></el-image>
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
