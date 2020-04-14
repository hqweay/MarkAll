<template>
  <MainPage type="tag" :data="tags"></MainPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import tagMapper from "#/db/mapper/tagMapper";
import MainPage from "@/components/MainPage.vue";
@Component({
  name: "tag-list",
  components: {
    MainPage
  }
})
export default class extends Vue {
  tags: Array<string> = [];
  created() {
    this.tags = tagMapper.getTags();
  }
}
</script>

<style scoped lang="scss">
</style>