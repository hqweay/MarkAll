<template>
  <div class="template-date">
    {{
    date.getFullYear() +
    " 年 " +
    date.getMonth() +
    " 月 " +
    date.getDay() +
    " 日"
    }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-date"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() dateItem!: string;
  date: Date = new Date();
  created() {
    this.date = new Date(this.dateItem);
  }
}
</script>
<style lang='scss'>
</style>