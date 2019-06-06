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
        v-for="template in templates"
        :key="template.name"
        @click="toItemsByTemName(template.name)"
      >
        <div class="container">
          <div class="card">
            <span class="show name">
              <h1>
                <a target="_blank">{{template.name}}</a>
              </h1>
            </span>
            <span class="show style">
              <pre>{{template.style}}</pre>
            </span>

            <div class="edit" @click.stop="editTemplate(template.name)">
              <img src="@/assets/icon/edit.png" alt>
            </div>
            <div class="delete" @click.stop="deleteTemplate(template.name)">
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
  getTemplates,
  deleteTemplateByName
} from "@/../shared/db/mapper/templateMapper";

export default {
  data() {
    return {
      templates: [
        {
          name: "test"
        }
      ]
      // welcome: ""
    };
  },
  created: function() {
    // if (this.$route.query.welcome) {
    //   this.welcome = this.$route.query.welcome;
    //   console.log(this.welcome);
    // }
    this.templates = getTemplates();
  },
  methods: {
    notify(message) {
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message)
      });
    },
    toItemsByTemName(temName) {
      // this.$router.push({ name: 'home', params: { userId: wise }})
      this.$router.push("/item/template/" + temName);
    },
    editTemplate(temName) {
      // this.$router.push({ name: 'home', params: { userId: wise }})
      this.$router.push("/template/info/" + temName);
    },
    addTemplate() {
      this.$router.push("/template/add");
    },
    deleteTemplate(name) {
      deleteTemplateByName(name);
      // this.$router.push("/template");
      this.templates = getTemplates();
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
        text-align: center;
      }
      span {
        width: 70%;
        height: 100px;
        margin-left: 40px;
      }
      .name {
        overflow: hidden;
        white-space: normal;
      }
      .style {
        height: 180px;
        overflow: hidden;
        white-space: normal;
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