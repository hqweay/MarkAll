<template>
  <div class="template-image">
    <div class="container">
      <div class="demonstration">{{imageItem.name}}</div>
      <el-image style="width:400px;" :src="imageItem.url" :lazy="true">
        <div slot="placeholder" class="image-slot">
          <el-image :src="require('@/assets/images/loading.png')"></el-image>
        </div>
        <div slot="error" class="image-slot">
          <el-image :src="require('@/assets/images/error.png')"></el-image>
        </div>
      </el-image>
    </div>
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
// fix el-image add hidden to body
body {
  overflow: auto !important;
}
.template-image {
  text-align: center;
}
</style>