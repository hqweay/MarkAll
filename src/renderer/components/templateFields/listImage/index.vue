<template>
  <div class="template-list-image">
    <el-row class="list-container" :gutter="20">
      <el-col
        class="template-image"
        :span="6"
        v-for="imageItem in listImage.value"
        :key="imageItem.name"
      >
        <!-- <div class="demonstration">{{imageItem.name}}</div> -->
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
.template-image {
  // margin: 0;
  // line-height: 100px;
  margin-top: 15px;
  &:nth-child(-n + 4) {
    margin-top: 0;
  }
}
</style>