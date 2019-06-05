<template>
  <div class="container">
    <div class="card">
      <json-editor ref="JsonEditor" :schema="schema" v-model="model">
        <button @click="submit">submit</button>
        <button @click="reset">Reset</button>
      </json-editor>
    </div>
  </div>
</template>

<script>
const SCHEMA = {
  type: "object",
  title: "vue-json-editor demo",
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: "string"
    }
  }
};
// import vue-json-ui-editor
import JsonEditor from "vue-json-ui-editor";
export default {
  components: { JsonEditor },
  data: () => ({
    // init json schma file ( require('@/schema/newsletter') )
    schema: SCHEMA,
    // data
    model: {
      name: "Yourtion"
    }
  }),

  methods: {
    submit(_e) {
      alert(JSON.stringify(this.model));
    },
    reset() {
      this.$refs.JsonEditor.reset();
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  background-color: #75d8af;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  height: 800px;
  border-radius: 5px;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
