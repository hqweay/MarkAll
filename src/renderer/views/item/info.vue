<template>
  <div class="container">
    <div class="card">
      <div class="add-container">
        <!-- <div class="test"> -->
        <el-row type="flex" align="middle">
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{item.template_style.name}}</span>
              </div>
              <pre class="json">{{ item }}</pre>
            </el-card>
            <br>
          </el-col>

          <el-col>
            <el-card class="form">
              <json-editor ref="JsonEditor" :schema="schema" v-model="item">
                <el-button type="primary" @click="editItem(item)">提交</el-button>
                <el-button type="reset" @click="reset()">重置</el-button>
              </json-editor>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getItemByID, editItemByID } from "@/../shared/db/mapper/itemMapper";

import { templatePraseSchema } from "@/utils/templatePraseSchema";
const SCHEMA = {};

import JsonEditor from "@/utils/JsonEditor";

import { getTemplateByName } from "@/../shared/db/mapper/templateMapper";

// import { checkJson } from "@/utils/checkJson";
export default {
  components: { JsonEditor },
  data() {
    return {
      schema: SCHEMA,
      template: {
        name: "哈哈",
        style: {}
      },
      item: {
        template_name: "",
        template_style: {},
        tag_name: ""
      },
      oldItem: {}
    };
  },
  created: function() {
    let id = this.$route.params.id;
    this.item = getItemByID(id);
    this.template = getTemplateByName(this.item.template_name);
    this.schema = templatePraseSchema(this.template);

    // 深拷贝做个备份
    this.oldItem = JSON.parse(JSON.stringify(this.item));
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    editItem(item) {
      // let newItem = [];
      // if (typeof itemString == "string") {
      //   try {
      //     newItem = JSON.parse(itemString);
      //   } catch (e) {
      //     this.notify("请保证 json 格式");
      //     return false;
      //   }
      let status = editItemByID(item);
      if (status === 0) {
        this.notify("未修改");
        return false;
      } else if (status === 1) {
        //
        this.notify("名称和已有数据重复");
        return false;
      }
      this.notify("修改成功");
      this.item = item;
    },
    reset() {
      this.item = this.oldItem;
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
