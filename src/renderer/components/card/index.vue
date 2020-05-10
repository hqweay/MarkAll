<template>
  <div class="container" @click="showInfo(data)">
    <div v-bind:class="['card', 'card-'+type]">
      <span class="show item-name">
        <h2>
          <a target="_blank" v-if="type === 'item'">{{data.style_content[0].value[0]}}</a>
          <a target="_blank" v-else-if="type === 'template'">{{data.name}}</a>
          <a target="_blank" v-else-if="type === 'tag'">{{data}}</a>
        </h2>
      </span>
      <span class="show template-name">
        <h3 v-if="type === 'item'">{{data.template_name}}</h3>
      </span>
      <span class="show tag-name">
        <h4 v-if="type === 'item' && data.tags.length > 0">{{data.tags}}</h4>
      </span>
      <!-- <div class="edit" @click.stop="edit(data)">
        <img src="@/assets/icon/edit.png" alt />
      </div>-->

      <!-- <div class="delete" @click.stop="del(data)">
        <img src="@/assets/icon/trash.png" alt />
      </div>-->
      <div v-if="type !== 'item'" class="to-items" @click.stop="toItems(data)">
        <i type="primary" class="el-icon-s-promotion"></i>
      </div>
      <div class="delete">
        <i class="el-icon-delete" @click.stop="del(data)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

// import { deleteItemByID } from "#/db/mapper/itemMapper";
import itemMapper from "#/db/mapper/itemMapper";
import tagMapper from "#/db/mapper/tagMapper";
import templateMapper from "#/db/mapper/templateMapper";
import { ipcRenderer } from "electron";
// import logger from "../../../universal/utlis/logger";
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
        // this.$electron.ipcRenderer.send("showCardInfo", this.type, data);
        break;
      case "template":
        // this.$router.push("/template/info/" + data.id);
        ipcRenderer.send("showTemplateInfo", this.type, data);
        break;
      case "tag":
        // 不必
        this.editTag(data);
        break;
      default:
        break;
    }
  }
  editTag(oldTag: any) {
    this.$prompt("修改标签名", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPlaceholder: oldTag
    })
      //@ts-ignore
      .then(({ value }) => {
        let newTag = value;
        if (
          newTag === null ||
          newTag.trim() === "" ||
          newTag.trim() === oldTag
        ) {
          newTag = oldTag;
          this.$message({
            type: "info",
            message: "未做修改"
          });
          return;
        }
        if (tagMapper.editTagByName(oldTag, newTag) === false) {
          this.$message({
            type: "error",
            message: "标签 " + newTag + " 已存在"
          });
        } else {
          this.$message({
            type: "success",
            message: "修改标签为：" + newTag
          });
          this.$emit("updateMainPage", this.type, oldTag, newTag);
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消修改"
        });
      });
  }
  toItems(data: any) {
    if (data.name != undefined) {
      // to items by templateName
      this.$store.state.view.list = "template";
      this.$router.push({
        path: "/main/item",
        query: { templateID: data.id }
      });
    } else {
      // to items by tagName
      this.$store.state.view.list = "tag";
      this.$router.push({
        path: "/main/item",
        query: { tagName: data }
      });
    }
  }

  edit(data: any) {
    // if (this.type === "item") {
    // }
  }
  // 统一删除模板、条目、标签
  del(data: any) {
    if (this.type === "item") {
      if (itemMapper.deleteItemByID(this.data.id)) {
        this.$emit("updateMainPage", this.type, this.data);
        this.$notify.info({
          title: "成功",
          message: "删除条目成功！"
        });
      } else {
        this.$notify.error({
          title: "错误",
          message: "删除条目失败！"
        });
      }
    } else if (this.type === "template") {
      if (templateMapper.deleteTemplateByName(this.data.name)) {
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
      if (tagMapper.deleteTagByName(this.data)) {
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