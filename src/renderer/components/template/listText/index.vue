<template>
  <div class="template-list-text">
    <el-row>
      <el-col :span="12" v-for="text in listText" :key="text">
        <div class="grid-content bg-purple">{{text}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-list-text"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listText!: Array<string>;
  created() {}
}
</script>
<style lang='scss'>
</style>