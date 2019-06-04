<template>
  <div class="template">
    <ul class="item-list">
      <li class="item">
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
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
// import { getTemplates } from "../../../shared/db/mapper/templateMapper";
import { getTemplates } from "@/../shared/db/mapper/templateMapper";

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
    showInfo(temName) {
      // this.$router.push({ name: 'home', params: { userId: wise }})
      this.$router.push("template/info/" + temName);
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
