<template>
  <div class="container" @click="showInfo(data)">
    <div v-bind:class="['card', 'card-'+type]">
      <span class="show item-name">
        <h1>
          <a target="_blank" v-if="type === 'item'">{{data.style_content[0].value}}</a>
          <a target="_blank" v-else-if="type === 'template'">{{data.name}}</a>
          <a target="_blank" v-else-if="type === 'tag'">{{data}}</a>
        </h1>
      </span>
      <span class="show template-name">
        <h2 v-if="type === 'item'">{{data.template_name}}</h2>
      </span>
      <span class="show tag-name">
        <h3 v-if="type === 'item' && data.tags.length > 0">{{data.tags}}</h3>
      </span>
      <!-- <div class="edit" @click.stop="edit(data)">
        <img src="@/assets/icon/edit.png" alt />
      </div>-->
      <div class="delete" @click.stop="del(data)">
        <img src="@/assets/icon/trash.png" alt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { deleteItemByID } from "#/db/mapper/itemMapper";
import { deleteTagByName } from "#/db/mapper/tagMapper";
import { deleteTemplateByName } from "#/db/mapper/templateMapper";
import { ipcRenderer } from "electron";
@Component({
  name: "card"
})
export default class extends Vue {
  @Prop() readonly type!: string;
  @Prop() readonly data!: any;
  created() {}
  showInfo(data: any) {
    switch (this.type) {
      case "item":
        // this.$router.push("/main/item/info/" + data.id);
        ipcRenderer.send("showCardInfo", this.type, data);
        break;
      case "template":
        this.$router.push("/main/template/info/" + data.id);
        break;
      case "tag":
        // 不必
        break;
      default:
        break;
    }
  }
  edit(data: any) {
    // if (this.type === "item") {
    // }
  }
  del(data: any) {
    if (this.type === "item") {
      if (deleteItemByID(this.data.id)) {
        this.$emit("updateMainPage", this.type, this.data);
        this.$notify.info({
          title: "成功",
          message: "删除条目成功！"
        });
      } else {
        this.$notify.error({
          title: "错误",
          message: "删除失败！"
        });
      }
    } else if (this.type === "template") {
      if (deleteTemplateByName(this.data.name)) {
        this.$emit("updateMainPage", this.type, this.data);
        this.$notify.info({
          title: "成功",
          message: "删除模板成功！"
        });
      } else {
        this.$notify.error({
          title: "错误",
          message: "删除模板失败！"
        });
      }
    } else if (this.type === "tag") {
      if (deleteTagByName(this.data)) {
        this.$emit("updateMainPage", this.type, this.data);
        this.$notify.info({
          title: "成功",
          message: "删除标签成功！"
        });
      } else {
        this.$notify.error({
          title: "错误",
          message: "删除失败！"
        });
      }
    }
  }
}
</script>
<style lang='scss'>
@import "./index.scss";
</style>