<template>
  <div class="container">
    <div class="card">
      <div class="edit">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容"
          v-model="tag.name"
          clearable
        ></el-input>
        <button class="btn" @click="addTagNow(tag)">添加</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addTag } from "@/../shared/db/mapper/tagMapper";
export default {
  data() {
    return {
      tag: {
        name: ""
      }
    };
  },
  created: function() {},
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
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
  height: 600px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  .edit {
    width: 80%;
    margin: 0 auto;
  }
  .btn {
    margin-top: 40px;
  }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
