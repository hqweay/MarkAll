<template>
  <div class="container">
    <div class="card">
      <!-- <div class="name">
        <h1>{{tag.name}}</h1>
      </div>-->
      <div class="edit">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容"
          v-model="tag.name"
          clearable
        ></el-input>
        <button class="btn" @click="editTagNow(tag)">修改</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { editTagByName } from "@/../shared/db/mapper/tagMapper";
import { editTagByName } from "@/../shared/db/mapper/tagMapper";
export default {
  data() {
    return {
      tag: {
        name: ""
      },
      oldTagName: ""
    };
  },
  created: function() {
    this.tag.name = this.$route.params.name;
    this.oldTagName = this.tag.name;
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    editTagNow(newTag) {
      if (editTagByName(this.oldTagName, this.tag) == false) {
        this.notify("修改后的数据和已有数据重复,或者您尚未修改...");
        return false;
      }
      this.$router.push("/tag");
      this.notify("修改成功");
      this.oldTagName = this.tag.name;
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
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
}
</style>
