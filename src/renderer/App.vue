<template>
  <div id="app">
    <el-row :gutter="40" type="flex">
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <div class="siderbar">
            <div class="siderbar-header">
              <div class="search">
                <input type="text" placeholder="搜索">
              </div>
            </div>
            <div class="siderbar-body">
              <ul>
                <li>
                  <router-link to="/template">
                    <div class="tab-link">类别</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/item">
                    <div class="tab-link">条目</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/tag">
                    <div class="tab-link">标签</div>
                  </router-link>
                </li>
                <li>
                  <a href="/">测试</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <div class="content">
            <index/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import index from "./views/index.vue";

export default {
  name: "mark-all",
  data() {
    return {};
  },
  components: {
    index
  },
  created: function() {}
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100px;
  color: black;

  .siderbar,
  .content {
    position: fixed;
  }
  .siderbar {
    top: 20%;
    left: 5%;
    bottom: 0;
    border-color: aquamarine;
    a {
      text-decoration: none;
    }
    .siderbar-body {
      margin-top: 20%;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin-top: 20px;
        }
        a {
          color: #333;
          font-weight: 700;
          // line-height: 40px;
        }
        a:hover {
          color: cadetblue;
        }
      }
    }
  }
  .content {
    width: 70%;
    top: 0;
    bottom: 0;
    // overflow: hidden;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>