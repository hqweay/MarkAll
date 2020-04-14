<template>
  <MainPage type="template" v-bind:data="templates"></MainPage>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import templateMapper from "#//db/mapper/templateMapper";

import MainPage from "@/components/MainPage.vue";
@Component({
  name: "template-list",
  components: {
    MainPage
  }
})
export default class extends Vue {
  templates: Array<TemplateType> = [];
  created() {
    this.templates = templateMapper.getTemplates();
  }
}
</script>

<style scoped lang="scss">
</style>