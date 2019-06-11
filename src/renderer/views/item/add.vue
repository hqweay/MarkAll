<template>
  <div class="container">
    <div class="card">
      <div class="add-container">
        <!-- <div class="test"> -->
        <el-row type="flex" align="middle">
          <el-col>
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <!-- <span>{{item.template_style.name}}</span> -->
                <span>添加条目信息</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="showStyle()"
                >{{style.message}}</el-button>
              </div>

              <el-collapse-transition>
                <div v-if="style.isShow == true" class="style">
                  <pre class="json">{{ item }}</pre>
                </div>
              </el-collapse-transition>
            </el-card>
            <br>
          </el-col>
 
          <el-col>
            <el-card class="form" shadow="hover">
              <json-editor ref="JsonEditor" :schema="schema" v-model="item">
                <el-button type="primary" @click="addItemNow()">添加</el-button>
                <el-button type="reset" @click="reset()">重置</el-button>
              </json-editor>
            </el-card>
          </el-col>
        </el-row>
        <!-- </div> -->
        <!-- <div class="template">{{template.name}}</div>
        <div class="edit">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="item.name"
            clearable
          ></el-input>
          <button class="btn" @click="addTagNow(tag)">添加</button>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { templatePraseSchema } from "@/utils/jsonEditor/templatePraseSchema";
const SCHEMA = {};

import JsonEditor from "@/utils/jsonEditor/JsonEditor";

import { getTemplateByName } from "@/../shared/db/mapper/templateMapper";
import { addItem } from "@/../shared/db/mapper/itemMapper";

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
      oldItem: {},
      style: {
        isShow: false,
        message: "展开"
      }
    };
  },
  created: function() {
    // 初始化
    if (this.$route.params.temName) {
      this.template = getTemplateByName(this.$route.params.temName);
      this.schema = templatePraseSchema(this.template);
      this.item.template_name = this.$route.params.temName;
      this.item.template_style = this.template.style;
      // 深拷贝做个备份
      this.oldItem = JSON.parse(JSON.stringify(this.item));
    }
  },
  methods: {
    showStyle() {
      this.style.isShow = this.style.isShow === true ? false : true;
      this.style.message = this.style.message === "折叠" ? "展开" : "折叠";
    },
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    addItemNow() {
      // 牛皮
      // 不知为何 addItem 调用了 lodash-id 的 insert 方法,会导致这里传的参数(item)改变为插入后添加了 id 的 item
      // 所以这里传入 item 的拷贝,item 就不会被修改了
      // 为什么啊
      // 真的秀...
      // js 可能可以这样吧 不太懂
      let newItem = JSON.parse(JSON.stringify(this.item));

      if (addItem(newItem) == false) {
        this.notify("不能重复添加呀~");
        return false;
      }
      this.notify("添加成功,继续添加吧~");
      // 提示开启个严格校验啥的
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

  // .add-container {
  //   display: flex;
  //   flex-direction: column;
  // }

  // .add-container {
  //   display: flex;
  //   flex-direction: column;
  //   width: 100%;
  //   .template {
  //     text-align: center;
  //   }
  //   .edit {
  //     width: 80%;
  //     margin: 0 auto;
  //     margin-top: 10px;
  //     margin-bottom: 10px;
  //     .btn {
  //       margin-top: 40px;
  //     }
  //   }
  // }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
