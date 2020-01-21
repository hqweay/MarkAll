<template>
  <div class="main-page">
    <!-- item -->
    <ul class="item-list list" v-if="type === 'item'">
      <li class="item" @click="add()">
        <div class="container">
          <div class="card card-add">
            <ul class="item-attr">
              <li class="add">
                <h1>添加条目</h1>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="item" v-for="item in data" :key="item.id">
        <Card type="item" v-bind:data="item" @updateMainPage="updateUI"></Card>
      </li>
    </ul>
    <!-- template -->
    <ul class="template-list list" v-if="type === 'template'">
      <li class="template" @click="add()">
        <div class="container">
          <div class="card card-add">
            <ul class="template-attr">
              <li class="add">
                <h1>添加模板</h1>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="template" v-for="template in data" :key="template.name">
        <Card type="template" v-bind:data="template" @updateMainPage="updateUI"></Card>
      </li>
    </ul>
    <!-- tag -->
    <ul class="tag-list list" v-if="type === 'tag'">
      <li class="tag" @click="add()">
        <div class="container">
          <div class="card card-add">
            <ul class="tag-attr">
              <li class="add">
                <h1>添加标签</h1>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="tag" v-for="tag in data" :key="tag">
        <Card type="tag" v-bind:data="tag" @updateMainPage="updateUI"></Card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/components/Card.vue";
@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  @Prop() readonly type!: string;
  // data 是个 list
  @Prop() readonly data!: any;
  created() {}

  notify(message: string) {
    const h = this.$createElement;
    this.$notify({
      title: "提示",
      message: h("i", { style: "color: teal" }, message)
    });
  }
  // type 没用，先留着。
  updateUI(type: string, obj: any) {
    var index = this.data.indexOf(obj);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }
}
</script>
<style scoped lang="scss">
* {
  display: flex;
}
.main-page {
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .list {
    margin-bottom: 40px;
    li {
      margin-top: 20px;
    }
    // 还是平起好看点
    .add {
      margin-top: 0;
    }
  }
}
</style>
