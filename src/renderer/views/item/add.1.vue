<template>
  <div class="container">
    <div class="card">
      <div class="add-container">
        <div class="test">
          <el-row>
            <el-col :span="12">
              <el-card class="form">
                <json-editor ref="JsonEditor" :schema="schema" v-model="model">
                  <el-button type="primary" @click="submit">Subscribe</el-button>
                  <el-button type="reset" @click="reset">Reset</el-button>
                </json-editor>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>Model</span>
                </div>
                <pre class="json">{{ jsonString }}</pre>
              </el-card>
              <br>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>How to use</span>
                </div>
                <div class="json">
                  <p>
                    GitHub:
                    <a
                      href="https://github.com/yourtion/vue-json-ui-editor"
                      target="_blank"
                    >vue-json-ui-editor</a>
                  </p>
                  <p>
                    NPM:
                    <a
                      href="https://www.npmjs.com/package/vue-json-ui-editor"
                      target="_blank"
                    >json-editor</a>
                  </p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="template">{{template.name}}</div>
        <div class="edit">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="item.name"
            clearable
          ></el-input>
          <button class="btn" @click="addTagNow(tag)">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const SCHEMA = {
  type: "object",
  title: "vue-json-editor demo",
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: "string"
    }
  }
};
import JsonEditor from "vue-json-ui-editor";
import { getTemplateByName } from "@/../shared/db/mapper/templateMapper";
export default {
  components: { JsonEditor },
  data() {
    return {
      schema: SCHEMA,
      // data
      model: {
        name: "Yourtion"
      },
      template: {
        name: "哈哈",
        style: {}
      },
      item: {
        template_name: "",
        template_style: {},
        tag_name: ""
      }
    };
  },
  created: function() {
    // 初始化
    if (this.$route.params.temName) {
      this.template = getTemplateByName(this.$route.params.temName);
      this.item.template_name = this.template.name;
      this.item.template_style = this.template.style;
    }
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    addTagNow(tag) {
      if (tag.name == "") {
        this.notify("不能为空啊");
        return false;
      }
      // console.log(tagName);
      if (addTag(tag) == false) {
        this.notify("重复了");
        return false;
      }
      this.$router.push("/tag");
      this.notify("添加成功");
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
    display: flex;
    flex-direction: column;
    width: 100%;
    .template {
      text-align: center;
    }
    .edit {
      width: 80%;
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 10px;
      .btn {
        margin-top: 40px;
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
