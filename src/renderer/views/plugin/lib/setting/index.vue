<template>
  <div id="app">Guide</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import settingMapper from "#/db/mapper/settingMapper";
@Component({
  name: "guide",
  components: {}
})
export default class extends Vue {
  setting = settingMapper.getUser();
  created() {
    if (!this.setting.guide) {
      this.$router.push("/main");
    }
  }
}
</script>

<style scoped lang="scss">
html,
body,
div {
  margin: 0;
  padding: 0;
  border: 0px;
}
</style>
