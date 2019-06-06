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
            <span class="main-name">
              <h1>
                <a target="_blank">{{item.template_style.name}}</a>
              </h1>
            </span>
            <span class="template-name">
              <h2>{{item.template_name}}</h2>
            </span>
            <span class="tag-name">
              <h2>{{item.tag_name}}</h2>
            </span>
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
  getItemByName
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
    getItemByName();
    this.items = getItems();
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
      this.$router.push("/item/add");
    },
    showInfo(id) {
      // path 只能用 query 传参
      // this.$router.push({
      //   path: "/item/info",
      //   query: { templateName: nowTemplateName, name: nowName }
      // });
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
      span {
        margin: 0 10px 0 10px;
      }
      .main-name {
        height: 100px;
        // max-height: 80px;
        overflow: hidden;
        white-space: normal;
      }
      .add {
        text-align: center;
      }
      position: relative;
      .delete {
        position: absolute;
        bottom: 10px;
        right: 10px;
        img {
          height: 50px;
          width: 50px;
          // border: 5px solid #eee;
          // -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          // -moz-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          //  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
          -webkit-transition: all 0.5s ease-out;
          -moz-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
        }
        img:hover {
          height: 80px;
          width: 80px;
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