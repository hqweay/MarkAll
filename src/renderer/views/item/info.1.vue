<template>
  <div class="container">
    <div class="card">
      <div class="container">
        <div class="style">
          <pre>{{itemString}}</pre>
        </div>
        <div class="edit">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
            v-model="itemString"
            clearable
          ></el-input>
          <button class="btn" @click="editItem(item.id, itemString)">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getItemByID, editItemByID } from "@/../shared/db/mapper/itemMapper";
import { checkJson } from "@/utils/checkJson";
export default {
  data() {
    return {
      item: {
        template_name: "小说"
      },
      itemString: ""
    };
  },
  created: function() {
    let id = this.$route.params.id;
    this.item = getItemByID(id);
    this.itemString = checkJson(JSON.stringify(this.item));
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    editItem(id, itemString) {
      let newItem = [];
      if (typeof itemString == "string") {
        try {
          newItem = JSON.parse(itemString);
        } catch (e) {
          this.notify("请保证 json 格式");
          return false;
        }
        if (editItemByID(id, newItem) == false) {
          this.notify("修改后的数据与已有数据重复");
          return false;
        }
        this.notify("修改成功");
        this.item = newItem;
      }
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
