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
          <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="templateString"
            clearable
          ></el-input>-->
          <JsonEditor
            :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
            :objData="jsonData"
            v-model="jsonData"
          ></JsonEditor>
          <button class="btn" @click="editTemplate(template.name, templateString)">修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getTemplateByName,
  editTemplateByName
} from "@/../shared/db/mapper/templateMapper";
export default {
  data() {
    return {
      template: {},
      templateString: ""
    };
  },
  created: function() {
    this.template = getTemplateByName(this.$route.params.name);
    // this.name = this.template.name;
    this.templateString = JSON.stringify(this.template);
  },
  methods: {
    editTemplate(oldName, templateString) {
      console.log(oldName);
      console.log(templateString);
      let newTemplate = [];
      try {
        newTemplate = JSON.parse(templateString);
      } catch (e) {
        this.errorNotify();
      }
      editTemplateByName(oldName, newTemplate);
    },
    errorNotify() {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, "要保证json格式哦")
      });
    },
    successNotify() {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, "成功啦!!")
      });
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
  height: 800px;
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
