<template>
  <div class="template-image">
    <div class="container" v-show="!isEdit">
      <div class="demonstration">{{imageItem.value.name}}</div>
      <el-image style="width:200px;" :src="imageItem.value.url" :lazy="true">
        <div slot="placeholder" class="image-slot">
          <el-image :src="require('@/assets/images/loading.png')"></el-image>
        </div>
        <div slot="error" class="image-slot">
          <el-image :src="require('@/assets/images/error.png')"></el-image>
        </div>
      </el-image>
    </div>
    <div class="edit-image" v-show="isEdit">
      <el-input placeholder="请输入内容" v-model="imageItem.value.name">
        <template slot="prepend">名称</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="imageItem.value.url">
        <template slot="prepend">URL</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="imageItem.value.description">
        <template slot="prepend">描述</template>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "template-image"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() imageItem!: any;
  @Prop() isEdit!: boolean;
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
.el-input {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>