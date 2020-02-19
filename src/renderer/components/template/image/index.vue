<template>
  <div class="template-image">
    <span class="demonstration">{{imageItem.value.name}}</span>
    <el-image style="width:400px;" :src="imageItem.value.url" :lazy="true">
      <div slot="error" class="image-slot">
        <el-image :src="require('@/assets/images/error.png')"></el-image>
      </div>
      <div slot="placeholder" class="image-slot">
        <el-image :src="require('@/assets/images/loading.png')"></el-image>
      </div>
    </el-image>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "card"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() imageItem!: any;
  created() {}
}
</script>
<style lang='scss'>
.template-image {
  text-align: center;
  .el-image {
    margin: 0 auto;
  }
}
</style>