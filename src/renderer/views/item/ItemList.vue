<template>
  <MainPage type="item" v-bind:data="items"></MainPage>
</template>
 
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import {
//   getItems,
//   getItemsByPage,
//   deleteItemByID,
//   getItemsByName,
//   getItemsByTemplateName,
//   getItemsByTagName
// } from "#/db/mapper/itemMapper";
import itemMapper from "#/db/mapper/itemMapper";

import MainPage from "@/components/MainPage.vue";

import { ipcRenderer } from "electron";

@Component({
  name: "item-list",
  components: {
    MainPage
  }
})
export default class extends Vue {
  message: string = "data variable";
  items: Array<ItemType> = [];
  item: ItemType = {
    id: "",
    created_time: "",
    updated_time: "",
    template_id: "",
    style_content: [],
    tags: []
  };
  page: number = 10;

  created() {
    if (this.$route.query.templateID) {
      // 通过 模板名 获取 条目
      this.items = itemMapper.getItemsByTemplateID(
        this.$route.query.templateID.toString()
      );
    } else if (this.$route.query.tagName) {
      // 通过 标签名 获取 条目
      this.items = itemMapper.getItemsByTagName(
        this.$route.query.tagName.toString()
      );
    } else if (this.$route.query.searchText) {
      // console.log(this.$route.query.searchText);
      // search

      // 搜索 匹配全文搜索或者搜索标题
      let searchText = this.$route.query.searchText.toString().trim();
      if (searchText.substr(0, 5) == "mark:") {
        searchText = searchText.substr(5, searchText.length);
        this.items = itemMapper.getItemsBySearchFullText(searchText);
      } else {
        this.items = itemMapper.getItemsBySearchText(searchText);
      }
    } else {
      this.items = itemMapper.getItems();
    }
    // if (this.$store.state.view.list == "template") {
    //   // 通过 模板名 获取 条目
    //   this.items = getItemsByTemplateName(this.$route.query.temName.toString());
    // } else if (this.$store.state.view.list == "tag") {
    //   // 通过 标签名 获取 条目
    //   this.items = getItemsByTagName(this.$route.query.tagName.toString());
    // } else {
    //   this.items = getItems();
    // }

    // 接受 info/index.vue 添加或编辑 item 后，更新 list。
    ipcRenderer.on("updateItemList", (event, message) => {
      if (this.$store.state.view.list == "template") {
        // 通过 模板 ID 获取 条目
        this.items = itemMapper.getItemsByTemplateID(
          this.$route.query.templateID.toString()
        );
      } else if (this.$store.state.view.list == "tag") {
        // 通过 标签名 获取 条目
        this.items = itemMapper.getItemsByTagName(
          this.$route.query.tagName.toString()
        );
      } else {
        this.items = itemMapper.getItems();
      }
    });
  }
  updateTest() {}

  @Watch("$route")
  private onChildChanged(val: any, oldVal: any) {
    this.$store.state.view.list = "item";

    if (this.$route.query.searchText) {
      // 搜索 匹配全文搜索或者搜索标题
      let searchText = this.$route.query.searchText.toString().trim();
      if (searchText.substr(0, 5) == "mark:") {
        searchText = searchText.substr(5, searchText.length);
        this.items = itemMapper.getItemsBySearchFullText(searchText);
      } else {
        this.items = itemMapper.getItemsBySearchText(searchText);
      }
    } else {
      this.items = itemMapper.getItems(); //getItemsByPage(10, 10);
    }
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
    itemMapper.deleteItemByID(id);
    this.items = itemMapper.getItems();
    this.notify("删除成功");
  }
}
</script>
<style scoped lang="scss">
</style>
