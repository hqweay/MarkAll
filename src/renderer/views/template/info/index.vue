<template>
  <div class="template-info">
    <div id="editor_holder"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import JSONEditor from "@json-editor/json-editor";

@Component({
  components: {}
})
export default class extends Vue {
  schema: any = {
    title: "Person",
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "First and Last name",
        minLength: 4,
        default: "Jeremy Dorn"
      },
      age: {
        type: "integer",
        default: 25,
        minimum: 18,
        maximum: 99
      },
      favorite_color: {
        type: "string",
        format: "color",
        title: "favorite color",
        default: "#ffa500"
      }
    }
  };
  created() {}
}
</script> 

<style scoped lang="scss">
</style>
