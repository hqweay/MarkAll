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
    // 对象转 json 再 格式化(缩进)
    this.templateString = this.checkJson(JSON.stringify(this.template));
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
      }
    },
    checkJson(message) {
      if (message == "") {
        alert("不能为空");
        return false;
      } else {
        var res = "";
        for (var i = 0, j = 0, k = 0, ii, ele; i < message.length; i++) {
          //k:缩进，j:""个数
          ele = message.charAt(i);
          if (j % 2 == 0 && ele == "}") {
            k--;
            for (ii = 0; ii < k; ii++) ele = "    " + ele;
            ele = "\n" + ele;
          } else if (j % 2 == 0 && ele == "{") {
            ele += "\n";
            k++;
            // debugger;
            for (ii = 0; ii < k; ii++) ele += "    ";
          } else if (j % 2 == 0 && ele == ",") {
            ele += "\n";
            for (ii = 0; ii < k; ii++) ele += "    ";
          } else if (ele == '"') j++;
          res += ele;
        }
        return res;
      }
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
