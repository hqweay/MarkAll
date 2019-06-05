<template>
  <div class="container">
    <div class="card">
      <div class="container">
        <div class="name">
          <h1>
            <a target="_blank">{{template.name}}</a>
          </h1>
        </div>

        <div class="style">
          <pre>{{templateString}}</pre>
        </div>

        <div class="edit">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="templateString"
            clearable
          ></el-input>
          <button class="btn" @click="editTemplate(template.name, templateString)">修改</button>
          <button class="btn" @click="deleteTemplate(template.name)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getTemplateByName,
  editTemplateByName,
  deleteTemplateByName
} from "@/../shared/db/mapper/templateMapper";
import { checkJson } from "@/utils/checkJson";
export default {
  data() {
    return {
      template: {},
      templateString: ""
    };
  },
  created: function() {
    this.template = getTemplateByName(this.$route.params.name);
    // 对象转 json 再 格式化(缩进)
    this.templateString = checkJson(JSON.stringify(this.template));
  },
  methods: {
    editTemplate(oldName, templateString) {
      console.log(oldName);
      console.log(templateString);
      let newTemplate = [];
      if (typeof templateString == "string") {
        try {
          newTemplate = JSON.parse(templateString);
        } catch (e) {
          console.log(e);
          this.errorNotify();
          return false;
        }
        editTemplateByName(oldName, newTemplate);
        this.successNotify();
        this.template = newTemplate;
        console.log(this.template);
        console.log(newTemplate);
      }
    },
    deleteTemplate(oldName) {
      deleteTemplateByName(oldName);
      this.$router.push("/template");
      this.notify("删除成功");
    },
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    errorNotify() {
      this.notify("出错啦!!要保证 json 格式哦!!!");
    },
    successNotify() {
      this.notify("成功啦!!!");
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
  .container {
    margin: 10px 10px 10px 10px;
    .style {
      // width: 80%;
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
    .edit,
    .btn {
      margin-top: 40px;
      margin-bottom: 10px;
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
