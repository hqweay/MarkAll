<template>
  <keep-alive>
    <MainPage type="item" v-bind:data="items"></MainPage>
  </keep-alive>
</template>
 
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  getItems,
  getItemsByPage,
  deleteItemByID,
  getItemByName,
  getItemsByTemplateName,
  getItemsByTagName
} from "#/db/mapper/itemMapper";

import MainPage from "@/components/MainPage.vue";
@Component({
  components: {
    MainPage
  }
})
export default class extends Vue {
  message: string = "data variable";
  items: Array<ItemType> = [];
  item: ItemType = {
    id: "",
    template_name: "",
    style_content: [],
    tags: []
  };
  page: number = 10;
  created() {
    if (this.$route.params.temName) {
      // 通过 模板名 获取 条目
      this.items = getItemsByTemplateName(this.$route.params.temName);
    } else if (this.$route.params.tagName) {
      // 通过 标签名 获取 条目
      this.items = getItemsByTagName(this.$route.params.tagName);
    } else {
      this.items = getItems();
    }
  }

  @Watch("$route")
  private onChildChanged(val: any, oldVal: any) {
    console.log(val, oldVal);
    // this.items = getItemsByPage(10, 10);
  }
  notify(message: string) {
    const h = this.$createElement;
    this.$notify({
      title: "提示",
      message: h("i", { style: "color: teal" }, message)
    });
  }
  addItem() {
    // 跳到 模板(分类) 页面,选择一个模板
    // 添加一个属于该模板的条目
    // this.$router.push("/template");
    this.notify("请选择一个类别,在该类别下添加条目~");
    // this.$router.push({path : "/main/template", query: {addItem:"ss"}});

    // {
    //   path: "/main/template",
    //   query: { addItem: true }
    // }
  }
  showInfo(id: string) {
    // path 只能用 query 传参
    // this.$router.push({
    //   path: "/item/info",
    //   query: { templateName: nowTemplateName, name: nowName }
    // });
    this.$router.push("/main/item/info/" + id);
  }
  editItem(id: string) {
    this.$router.push("/item/info/" + id);
  }
  deleteItem(id: string) {
    deleteItemByID(id);
    this.items = getItems();
    this.notify("删除成功");
  }
}
</script>
<style scoped lang="scss">
</style>
