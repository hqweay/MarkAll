<template>
  <router-view></router-view>
</template> 

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "plugin"
})
export default class extends Vue {
  created() {}
}
</script>
<style lang='scss'>
</style>