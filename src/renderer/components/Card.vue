<template>
  <div class="container" @click="showInfo(data)">
    <div v-bind:class="['card', 'card-'+type]">
      <span class="show item-name">
        <h1>
          <a target="_blank" v-if="type === 'item'">{{data.style[0].value}}</a>
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
// control the card color
.card-item {
  background-color: #75d8af;
}
.card-template {
  background-color: #cff0da;
}
.card-tag {
  background-color: #88dba3;
}
// contro the add card color
.card-add {
  background-color: #b0d6194a;
  h1 {
    color: #bf209f;
  }
}
.container {
  padding: 2px 16px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.1s;
  width: 300px;
  height: 300px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  span {
    width: 70%;
    height: 110px;
    margin-left: 40px;
  }
  .item-name {
    height: 120px;
    overflow: hidden;
    white-space: normal;
  }
  .tag-name {
    height: 100px;
    overflow: hidden;
    white-space: normal;
  }
  position: relative;
  .edit {
    position: absolute;
    top: 22px;
    right: 10px;
    img {
      height: 40px;
      width: 40px;
      -webkit-transition: all 0.5s ease-out;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
    }
    img:hover {
      height: 50px;
      width: 50px;
      -webkit-transform: rotate(-7deg);
      -moz-transform: rotate(-7deg);
      -o-transform: rotate(-7deg);
    }
  }
  .delete {
    position: absolute;
    bottom: 10px;
    right: 10px;
    img {
      height: 40px;
      width: 40px;
      -webkit-transition: all 0.5s ease-out;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
    }
    img:hover {
      height: 50px;
      width: 50px;
      -webkit-transform: rotate(-7deg);
      -moz-transform: rotate(-7deg);
      -o-transform: rotate(-7deg);
    }
  }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>