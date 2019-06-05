<template>
  <div class="container">
    <div class="card">
      <ul class="item-attr">
        <li class="url">
          <h1>
            <a target="_blank">{{template.name}}</a>
          </h1>
        </li>
        <li class="style">
          <pre>
            {{template.style}}</pre>
        </li>
        <li class="edit">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="templateString"
            clearable
          ></el-input>
          <button class="btn" @click="editTemplate(template.name, templateString)">修改</button>
          <button class="btn" @click="deleteTemplate(template.name)">删除</button>
        </li>
      </ul>
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
  height: 700px;
  border-radius: 5px;
  cursor: pointer;
  ul {
    list-style: none;
    margin: 0;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: 40px;
    .edit {
      margin-top: 40px;
    }
    .btn {
      margin-top: 40px;
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
