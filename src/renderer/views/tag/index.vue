<template>
  <div class="template">
    <ul class="item-list">
      <li class="item" @click="addTag()">
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
      <li class="item" v-for="tag in tags" :key="tag.name" @click="showInfo(tag.name)">
        <div class="container">
          <div class="card">
            <ul class="item-attr">
              <li class="name">
                <h1>
                  <a target="_blank">{{tag.name}}</a>
                </h1>
              </li>

              <div class="delete" @click.stop="deleteTag(tag.name)">
                <img src="@/assets/icon/trash.png" alt>
              </div>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTags, deleteTagByName } from "@/../shared/db/mapper/tagMapper";

export default {
  data() {
    return {
      tags: [
        {
          name: "test"
        }
      ]
    };
  },
  created: function() {
    this.tags = getTags();
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    addTag() {
      this.$router.push("/tag/add");
    },
    showInfo(tagName) {},
    deleteTag(tagName) {
      deleteTagByName(tagName);
      this.tags = getTags();
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