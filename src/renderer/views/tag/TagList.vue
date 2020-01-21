<template>
  <keep-alive>
    <MainPage type="tag" :data="tags"></MainPage>
  </keep-alive>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getTags, deleteTagByName } from "#/db/mapper/tagMapper";
import MainPage from "@/components/MainPage.vue";
@Component({
  components: {
    MainPage
  }
})
export default class extends Vue {
  tags: Array<string> = [];
  created() {
    this.tags = getTags();
  }
}
</script>

<style scoped lang="scss">
</style>