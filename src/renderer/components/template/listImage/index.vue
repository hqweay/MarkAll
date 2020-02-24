<template>
  <div class="template-list-image">
    <el-row class="list-container" :gutter="20">
      <el-col class="template-image" :span="6" v-for="imageItem in listImage" :key="imageItem.name">
        <div class="demonstration">{{imageItem.name}}</div>

        <el-image :src="imageItem.url" :lazy="true">
          <div slot="error" class="image-slot">
            <el-image :src="require('@/assets/images/error.png')"></el-image>
          </div>
          <div slot="placeholder" class="image-slot">
            <el-image :src="require('@/assets/images/loading.png')"></el-image>
          </div>
        </el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "template-list-image"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listImage!: Array<any>;
  created() {}
}
</script>
<style lang='scss' scoped>
.template-list-image {
  margin: 0;
  padding: 0;
  border: 0;
  .template-image {
    text-align: center;
  }
}
</style>