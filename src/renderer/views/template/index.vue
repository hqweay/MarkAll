<template>
  <div class="template">
    <ul class="item-list">
      <li class="item" @click="addTemplate()">
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
      <li
        class="item"
        v-for="template in list"
        :key="template.name"
        @click="showInfo(template.name)"
      >
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
              <!-- .top 阻止事件继续向下传播 -->
              <div class="delete" @click.stop="deleteTemplate(template.name)">
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
// import { getTemplates } from "../../../shared/db/mapper/templateMapper";
import {
  getTemplates,
  deleteTemplateByName
} from "@/../shared/db/mapper/templateMapper";

export default {
  data() {
    return {
      list: [
        {
          name: "test"
        }
      ]
    };
  },
  created: function() {
    this.list = getTemplates();
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "标题名称",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    showInfo(temName) {
      // this.$router.push({ name: 'home', params: { userId: wise }})
      this.$router.push("template/info/" + temName);
    },
    addTemplate() {
      this.$router.push("template/add");
    },
    deleteTemplate(name) {
      deleteTemplateByName(name);
      // this.$router.push("/template");
      this.list = getTemplates();
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
      .style {
        margin-right: 40px;
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
