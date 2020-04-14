<template>
  <div class="template-info">template-info</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import templateMapper from "#/db/mapper/templateMapper";
@Component({
  components: {}
})
export default class extends Vue {
  template: TemplateType = {
    name: "",
    style: []
  };
  created() {
    let templateName = this.$route.params.name;
    console.log(templateName);
    this.template = templateMapper.getTemplateByName(templateName);
    console.log(this.template);
  }
}
</script> 

<style scoped lang="scss">
</style>
