<template>
  <div class="template-text">{{text}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-date"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() text!: any;
  created() {}
}
</script>
<style lang='scss'>
</style>