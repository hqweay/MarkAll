<template>
  <div class="template-info">
    <el-backtop :visibility-height="50"></el-backtop>
    <!-- 编辑 -->
    <div class="edit" @click="isEdit = isEdit==true?false:true">
      <i class="el-icon-edit-outline" v-show="!isEdit"></i>
      <i class="el-icon-check" v-show="isEdit"></i>
    </div>

    <div id="title">
      <h1 v-show="isEdit == false" class="title">{{this.template.name}}</h1>
      <el-input
        class="edit-title"
        v-show="isEdit == true"
        placeholder="请输入内容"
        v-model="template.name"
      >
        <template slot="prepend">模板名</template>
      </el-input>
    </div>

    <el-row class="style-list" :gutter="20" v-show="isEdit === false">
      <el-col
        :span="12"
        v-for="templateField in template.style"
        :class="['template-field']"
        :key="templateField.name"
      >
        <el-card
          :title="templateField.extra.description"
          shadow="hover"
          :class="[templateField.type, 'template-field']"
        >
          <h2>{{templateField.name}}</h2>
          <div class="type">{{templateField.type}}</div>
          <div class="extra">
            <div v-if="templateField.type === 'RATE'" class="rate">最大值： {{templateField.extra.max}}</div>
            <div v-if="templateField.type === 'ENUM'" class="rate">类型： {{templateField.extra.enums}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 编辑 -->
    <el-row class="style-edit" :gutter="20" v-show="isEdit === true">
      <!-- <el-col
        :span="12"
        v-for="templateField in template.style"
        :class="['template-field']"
        :key="templateField.type + '-' + templateField.name"
      >-->
      <el-col
        :span="12"
        v-for="(templateField, index) in template.style"
        :class="['template-field']"
        :key="index"
      >
        <el-card
          :title="templateField.extra.description"
          shadow="hover"
          :class="[templateField.type, 'template-field']"
        >
          <div v-if="isEdit" class="delete" title="删除" @click="deleteTemplateField(templateField)">
            <i class="el-icon-close"></i>
          </div>

          <el-input placeholder="请输入内容" v-model="templateField.type" disabled>
            <template slot="prepend">类型</template>
          </el-input>

          <el-input placeholder="请输入内容" v-model="templateField.name">
            <template slot="prepend">名称</template>
          </el-input>

          <el-input placeholder="请输入内容" v-model="templateField.extra.description">
            <template slot="prepend">描述</template>
          </el-input>
          <div class="edit-extra">
            <el-input
              placeholder="请输入内容"
              v-if="templateField.type === 'RATE'"
              v-model="templateField.extra.max"
            >
              <template slot="prepend">最大</template>
            </el-input>

            <div class="extra-enum" v-if="templateField.type == 'ENUM'">
              <tagTemplate
                :isEdit="isEdit"
                @updateItem="updateEnums"
                v-bind:tags="templateField.extra.enums"
              ></tagTemplate>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-card class="addField" shadow="hover" :class="['add-template-field', 'template-field']">
        <el-select v-model="newField.type" placeholder="请选择">
          <el-option
            v-for="field in templateFields"
            :key="field.value"
            :label="field.label"
            :value="field.value"
            :disabled="field.disabled"
          ></el-option>
        </el-select>
        <el-input placeholder="请输入内容" v-model="newField.name">
          <template slot="prepend">名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="newField.extra.description">
          <template slot="prepend">描述</template>
        </el-input>
        <div class="edit-extra">
          <el-input
            placeholder="请输入内容"
            v-if="newField.type === 'RATE'"
            v-model="newField.extra.max"
          >
            <template slot="prepend">最大</template>
          </el-input>

          <div class="extra-enum" v-if="newField.type === 'ENUM'">
            <!-- <tagTemplate
              :isEdit="isEdit"
              @updateItem="updateItemTags"
              v-bind:tags="newField.extra.enums"
            ></tagTemplate>-->
            <tagTemplate
              :isEdit="isEdit"
              @updateItem="updateItemTags"
              v-bind:tags="newField.extra.enums"
            ></tagTemplate>
          </div>
        </div>
        <el-button @click="addTemplateField">确认添加</el-button>
      </el-card>
    </el-row>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import templateMapper from "#/db/mapper/templateMapper";
import tagTemplate from "@/components/itemFields/tag/index.vue";
import { remote, ipcRenderer } from "electron";
@Component({
  components: {
    tagTemplate
  }
})
export default class extends Vue {
  template: TemplateType = {
    id: "",
    name: "",
    style: []
  };
  oldTemplate: TemplateType = {
    id: "",
    name: "",
    style: []
  };
  templateFields: any = require("./template-field");
  isEdit: boolean = false;
  newField: TemplateFieldType = {
    name: "",
    type: "",
    extra: {
      enums: []
    }
  };

  created() {
    let templateID = this.$route.params.id;
    if (templateID != undefined) {
      this.template = templateMapper.getTemplateByID(templateID);
      this.oldTemplate = JSON.parse(JSON.stringify(this.template));
    } else {
      this.isEdit = true;
    }
    // console.log(templateID);
  }

  @Watch("isEdit")
  editDate(val: boolean, oldVal: boolean) {
    if (this.isEdit == false) {
      // 编辑
      this.updateTemplate();
    }
  }
  updateItemTags() {
    console.log("try");
  }

  async updateEnums(newEnums: Array<string>) {
    // 子组件的 prop 改动后，父组件的值也改动了……
    // 先这样吧，不用在这重新拿值
  }
  updateTemplate() {
    // edit
    if (this.$route.params.id != undefined) {
      this.template.name = this.template.name.trim();
      // 不可空
      if (this.template.name == "") {
        return;
      }
      // edit by ID
      if (!templateMapper.editTemplateByID(this.template)) {
        this.$notify.error({
          title: "失败",
          message: "～"
        });
        this.isEdit = true;
        return;
      }
    } else {
      // add
      if (templateMapper.addTemplate(this.template)) {
        console.log("ssuccess add");
        this.$router.push("/template/info/" + this.template.id);
      } else {
        this.$notify.error({
          title: "失败",
          message: "模板名不能与已有模板重复～"
        });
      }
    }
    // 通知 itemList.vue 更新页面
    ipcRenderer.sendTo(
      remote.getGlobal("mainWindow").webContents.id,
      "updateTemplateList"
    );
  }
  deleteTemplateField(templateField: TemplateFieldType) {
    this.template.style.remove(templateField);
  }
  addTemplateField() {
    // 不可空
    if (this.newField.type == "" || this.newField.name.trim() == "") {
      return;
    }
    // 不可重复
    // 不可重复
    for (let index in this.template.style) {
      if (this.newField.name == this.template.style[index].name.trim()) {
        this.newField.name = "";
        this.$notify.error({
          title: "失败",
          message: "名称不能重复～"
        });
        return;
      }
    }
    this.template.style.push(this.newField);
    this.newField = {
      name: "",
      type: "",
      extra: {}
    };
    this.$notify.success({
      title: "添加",
      message: "添加成功啦～"
    });
    return;
  }
}
</script> 

<style lang='scss' scoped>
@import "./index.scss";
</style>
