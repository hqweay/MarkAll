<template>
  <div class="template-list-url">
    <el-row v-if="!isEdit" class="list-container" :gutter="20">
      <el-col class="template-url" :span="12" v-for="urlItem in listUrl.value" :key="urlItem.name">
        <el-link @click="openUrl">
          {{urlItem.name}}
          <i class="el-icon--right"></i>
        </el-link>
      </el-col>
    </el-row>

    <el-row v-if="isEdit" class="edit-list-url" :gutter="20">
      <!-- <el-col class="add-url-button">
        <el-button size="small" type="primary" @click="addUrl">添加</el-button>
      </el-col>-->

      <el-col class="template-url" v-for="urlItem in listUrl.value" :key="urlItem.name">
        <el-card>
          <div class="delete" @click="delteUrl(urlItem)">
            <i class="el-icon-close"></i>
          </div>
          <el-input placeholder="请输入内容" v-model="urlItem.name">
            <template slot="prepend">名称</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="urlItem.url">
            <template slot="prepend">链接</template>
          </el-input>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="isEdit" class="edit-list-url">
      <el-card>
        <el-input ref="newName" placeholder="请输入内容" v-model="newUrl.name">
          <template slot="prepend">名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="newUrl.url">
          <template slot="prepend">链接</template>
        </el-input>
        <el-button size="small" type="primary" @click="addUrl">添加</el-button>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { openUrl } from "~/main/utils/openUrl";
@Component({
  name: "template-list-url"
})
export default class extends Vue {
  // @Prop() readonly item!: ItemType;
  @Prop() listUrl!: any;
  @Prop() isEdit!: boolean;
  newUrlVisiable: boolean = false;
  newUrl: any = {
    name: "",
    url: "",
    description: ""
  };

  created() {}
  addUrl() {
    // 格式化一下
    this.newUrl.name = this.newUrl.name.trim();
    this.newUrl.url = this.newUrl.url.trim();

    // 不可空
    if (this.newUrl.name === "" || this.newUrl.value === "") {
      console.log("不能为空");
      return;
    }
    // 不可重复
    if (this.listUrl.value.name.indexOf(this.newUrl.name) != -1) {
      console.log("不可重复");
      this.newUrl = "";
      return;
    }

    this.listUrl.value.push(this.newUrl);
    this.newUrl = {
      name: "",
      url: "",
      description: ""
    };
  }
  delteUrl(urlItem: any) {
    this.listUrl.value.remove(urlItem);
  }
  openUrl(url: string) {
    openUrl(url);
  }
}
</script>
<style lang='scss' >
.template-url {
  &:nth-child(-n + 2) {
    margin-top: 0;
  }
  margin-top: 10px;
}
.edit-list-url {
  .el-card {
    margin-top: 10px;
  }
  .delete {
    position: relative;

    font-size: 18px;
    color: red;
    left: 99%;
    top: -10px;
    cursor: pointer;
  }
  .delete:hover {
    // opacity: 0.3;
    color: black;
    transition: 1s;
  }
}
</style>