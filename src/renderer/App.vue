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
                  <router-link class="tab-item" to="/template">
                    <span class="tab-link">类别</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/tag">
                    <span class="tab-link">标签</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/item">
                    <span class="tab-link">条目</span>
                  </router-link>
                </li>
                <li>
                  <a href="/">测 s cc试</a>
                </li>
                <li>
                  <span @click="test">测试x x api</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <div class="content">
            <!-- <index/> -->
            <router-view></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import index from "./views/index.vue";

import { importData } from "@/../shared/db/import/importData";

export default {
  name: "mark-all",
  data() {
    return {};
  },
  components: {
    index
  },
  created: function() {},
  methods: {
    test() {
      importData();
    }
    // flush() {
    //   this.$router.go(0);
    // }
  }
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  // height: 100px;
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
          color: #285943;
        }
        .tab-item {
          &.router-link-active {
            .tab-link {
              color: #379392;
            }
          }
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