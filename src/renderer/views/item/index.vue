<template>
  <div class="template">
    <ul class="item-list">
      <li class="item" @click="addItem()">
        <div class="container">
          <div class="card">
            <ul class="item-attr">
              <li class="add">
                <h1>添加</h1>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="item" v-for="item in items" :key="item.id" @click="showInfo(item.id)">
        <div class="container">
          <div class="card">
            <span class="show main-name">
              <h1>
                <a target="_blank">{{item.template_style.name}}</a>
              </h1>
              <!-- {{item.template_style.name}} -->
            </span>
            <span class="show template-name">
              <h2>{{item.template_name}}</h2>
            </span>
            <span class="show tag-name">
              <!-- <h2>{{item.tag_name}}</h2> -->
              <h3 v-if="item.tag_name.length > 0">{{item.tag_name}}</h3>
              <!-- <span v-for="tag in item.tag_name" :key="tag">
                <h3>{{tag}}</h3>
              </span>-->
            </span>
            <div class="edit" @click.stop="editItem(item.id)">
              <img src="@/assets/icon/edit.png" alt>
            </div>
            <div class="delete" @click.stop="deleteItem(item.id)">
              <img src="@/assets/icon/trash.png" alt>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getItems,
  deleteItemByID,
  getItemByName,
  getItemsByTemplateName,
  getItemsByTagName
} from "@/../shared/db/mapper/itemMapper";

export default {
  data() {
    return {
      items: [
        {
          name: "test"
        }
      ]
    };
  },
  created: function() {
    // getItemByName();

    // 先判断 是否 通过啥查询
    // if (this.$route.query.welcome) {
    //   this.welcome = this.$route.query.welcome;
    //   console.log(this.welcome);
    // }

    if (this.$route.params.temName) {
      // 通过 模板名 获取 条目
      this.items = getItemsByTemplateName(this.$route.params.temName);
    } else if (this.$route.params.tagName) {
      // 通过 标签名 获取 条目
      this.items = getItemsByTagName(this.$route.params.tagName);
    } else {
      this.items = getItems();
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
    addItem() {
      // 跳到 模板(分类) 页面,选择一个模板
      // 添加一个属于该模板的条目
      // this.$router.push("/template");
      this.notify("请选择一个类别,在该类别下添加条目~");
      this.$router.push({
        path: "/template",
        query: { addItem: true }
      });
    },
    showInfo(id) {
      // path 只能用 query 传参
      // this.$router.push({
      //   path: "/item/info",
      //   query: { templateName: nowTemplateName, name: nowName }
      // });
      this.$router.push("/item/info/" + id);
    },
    editItem(id) {
      this.$router.push("/item/info/" + id);
    },
    deleteItem(id) {
      deleteItemByID(id);
      this.items = getItems();
      this.notify("删除成功");
    }
  }
};
</script>

<style scoped lang="scss">
* {
  display: flex;
}
.template {
  a {
    // color: black;
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item-list {
    margin-bottom: 40px;
    .item {
      margin-top: 20px;
    }
    .card {
      background-color: #75d8af;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 300px;
      height: 300px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      .add {
        h1 {
          color: #bf209f;
        }
      }
      span {
        width: 70%;
        height: 110px;
        margin-left: 40px;
      }
      .main-name {
        height: 120px;
        overflow: hidden;
        white-space: normal;
      }
      .tag-name {
        height: 100px;
        overflow: hidden;
        white-space: normal;
        // display: flex;

        // h3 {
        //   display: block;
        // }
      }
      .add {
        text-align: center;
      }
      position: relative;
      .edit {
        position: absolute;
        top: 22px;
        right: 10px;
        img {
          height: 40px;
          width: 40px;
          -webkit-transition: all 0.5s ease-out;
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
        }
        img:hover {
          height: 50px;
          width: 50px;
          -webkit-transform: rotate(-7deg);
          -moz-transform: rotate(-7deg);
          -o-transform: rotate(-7deg);
        }
      }
      .delete {
        position: absolute;
        bottom: 10px;
        right: 10px;
        img {
          height: 40px;
          width: 40px;
          // border: 5px solid #eee;
          // -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          // -moz-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          //  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          -webkit-transition: all 0.5s ease-out;
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
        }
        img:hover {
          height: 50px;
          width: 50px;
          -webkit-transform: rotate(-7deg);
          -moz-transform: rotate(-7deg);
          -o-transform: rotate(-7deg);
        }
      }
    }
    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .container {
      padding: 2px 16px;
    }
  }
}
</style>