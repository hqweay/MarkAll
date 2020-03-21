<template>
  <div class="main-page">
    <!-- item -->
    <ul class="item-list list" v-if="type === 'item'">
      <li class="item" @click="showAddItemDialog()">
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
    <!-- dialog 选择项：选择想要添加条目的模块 -->
    <div class="add-item">
      <el-dialog :modal="false" title="选择需要添加条目的模板" :visible.sync="addItemVisible">
        <div class="template-list">
          <el-tag
            @click="addItemByTemplate(template)"
            :disable-transitions="false"
            v-for="template in templates"
            :key="template.name"
          >{{template.name}}</el-tag>
        </div>
      </el-dialog>
    </div>

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
      <li class="tag" @click="addTag()">
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
import Card from "@/components/card/index.vue";
import { addTag } from "#/db/mapper/tagMapper";
import { getTemplates } from "#/db/mapper/templateMapper";
import { ipcRenderer } from "electron";

@Component({
  components: {
    Card
  }
})
export default class extends Vue {
  @Prop() readonly type!: string;
  // data 是个 list
  @Prop() readonly data!: any;
  templates: Array<TemplateType> = [];
  addItemVisible: boolean = false;
  created() {}
  notify(message: string) {
    const h = this.$createElement;
    this.$notify({
      title: "提示",
      message: h("i", { style: "color: teal" }, message)
    });
  }
  // type 没用，先留着。
  updateUI(type: string, obj: any, newObj: any) {
    // 本地删除
    // console.log(obj);
    this.data.remove(obj);

    // 编辑 Tag
    if (newObj !== undefined) {
      this.data.push(newObj);
    }
  }
  showAddItemDialog() {
    // get templates
    // ipcRenderer.send("additem");
    this.templates = getTemplates();
    this.addItemVisible = true;
  }
  addItemByTemplate(template: TemplateType) {
    // console.log(template);
    ipcRenderer.send("showCardInfo", "add", template);
    this.addItemVisible = false;
  }
  addTag() {
    this.$prompt("添加标签", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    })
      //@ts-ignore
      .then(({ value }) => {
        let newTag = value;
        if (newTag === null || newTag.trim() === "") {
          this.$message({
            type: "info",
            message: "未做添加"
          });
          return;
        }
        if (addTag(newTag) === false) {
          this.$message({
            type: "error",
            message: "标签 " + newTag + " 已存在"
          });
        } else {
          this.$message({
            type: "success",
            message: "添加标签 " + newTag
          });
          this.data.push(newTag);
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消添加"
        });
      });
  }
}
</script>
<style scoped lang="scss">
* {
  display: flex;
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
    .add-item {
      .template-list {
        display: block;

        height: 65vh;
        overflow: auto;

        .el-tag {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 1%;
        }
        .el-tag:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
