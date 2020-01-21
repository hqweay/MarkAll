<template>
  <div class="container">
    <title>条目信息</title>

    <div class="card">
      <div class="add-container">
        <!-- <div class="test"> -->
        <el-row type="flex" align="middle">
          <el-col>
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <!-- <span>{{item.template_style.name}}</span> -->
                <span>条目信息</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="showStyle()"
                >{{style.message}}</el-button>
              </div>
              <ul v-for="styleItem in this.item.style" :key="styleItem.name">
                <li>{{ styleItem }}</li>
              </ul>

              <!-- <el-collapse-transition>
                <div v-if="style.isShow == true" class="style">
                  <pre class="json">{{ item }}</pre>
                </div>
              </el-collapse-transition>-->

              <!-- 遍历项，根据不同 type 渲染不同效果。 -->
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getItemByID, editItemByID } from "#/db/mapper/itemMapper";

import { getTemplateByName } from "#/db/mapper/templateMapper";
const SCHEMA = {};
// import { checkJson } from "@/utils/checkJson";
@Component({
  components: {}
})
export default class extends Vue {
  template: TemplateType = {
    name: "",
    style: []
  };
  item: ItemType = {
    id: "",
    template_name: "",
    style: [],
    tags: []
  };
  oldItem: ItemType = {
    id: "",
    template_name: "",
    style: [],
    tags: []
  };
  style = {
    isShow: false,
    message: "展开"
  };
  created() {
    let id = this.$route.params.id;
    this.item = getItemByID(id);
    this.template = getTemplateByName(this.item.template_name);

    // 可视化渲染 json

    // this.schema = templatePraseSchema(this.template);

    // 深拷贝做个备份
    // this.oldItem = JSON.parse(JSON.stringify(this.item));
  }

  showStyle() {
    this.style.isShow = this.style.isShow !== true;
    this.style.message = this.style.message === "折叠" ? "展开" : "折叠";
  }
  notify(message: string) {
    const h = this.$createElement;
    this.$notify({
      title: "提示",
      message: h("i", { style: "color: teal" }, message)
    });
  }
  editItem(item: ItemType) {
    // let newItem = [];
    // if (typeof itemString == "string") {
    //   try {
    //     newItem = JSON.parse(itemString);
    //   } catch (e) {
    //     this.notify("请保证 json 格式");
    //     return false;
    //   }
    // 有点问题
    let status = editItemByID(item);
    if (status === false) {
      this.notify("未修改");
      // return false;
      // } else if (status === true) {
      // 不会生效,应该允许该操作
      this.notify("名称和已有数据重复");
      return false;
    } else {
      this.notify("修改成功");
      this.item = item;
    }
  }
  reset() {
    this.item = this.oldItem;
  }
}
</script>

<style scoped lang="scss">
.card {
  background-color: #26a4c4;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  min-height: 700px;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  // flex-direction: column;
  align-items: center;
  .add-container {
    width: 100%;
    display: flex;
    .el-row {
      margin: 20px 0 20px 0;
      width: 100%;
      flex-direction: column;
      .el-col {
        width: 80%;
        margin: 0 auto;
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
    }
  }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
