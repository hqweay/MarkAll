<template>
  <router-view></router-view>
</template> 

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "template-text"
})
export default class extends Vue {
  created() {}
}
</script>
<style lang='scss'>
</style>