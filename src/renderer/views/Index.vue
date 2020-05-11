<template>
  <div id="main">
    <el-row type="flex">
      <el-col :span="7" :lg="6">
        <div class="siderbar">
          <el-card class="siderbar-header">
            <el-input
              placeholder="请输入内容"
              @keyup.enter.native="search"
              prefix-icon="el-icon-search"
              v-model="searchText"
            ></el-input>
            <div class="siderbar-body">
              <ul>
                <li>
                  <router-link class="tab-item" to="/main/template">
                    <span class="tab-link">模板</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/main/tag">
                    <span class="tab-link">标签</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/main/item">
                    <span class="tab-link">条目</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-plugin" to="/main/plugin">
                    <span class="tab-link">插件</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/main/test">
                    <span class="tab-link">其它</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="17" :lg="18">
        <!-- <keep-alive :include="['item-list', 'tag-list', 'template-list']"> -->
        <div class="center">
          <router-view class="content"></router-view>
        </div>
        <!-- </keep-alive> -->
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import {createDoubanDataGetter} from "markall-douban-backup";
@Component({})
export default class extends Vue {
  searchText: string = "";
  search() {
    // if (this.$route.path == "/main/template") {

    this.$router
      .push({
        path: "/main/item",
        query: { searchText: this.searchText }
      })
      .catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });

    // }
  }
}
</script>

<style scoped lang="scss">
#main {
  // width: 100%;
  display: flex;
  flex-direction: column;
  color: black;

  // .content ,
  .siderbar {
    position: fixed;
  }
  .siderbar {
    top: 28%;
    // left: 5%;
    left: 60px;
    bottom: 0;
    // bottom: -10px;
    border-color: aquamarine;
    a {
      text-decoration: none;
    }
    .siderbar-body {
      margin-top: 16%;
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
  // .content {
  // width: 100%;
  // width: 800px;
  // top: 0;
  // bottom: 0;
  // overflow: auto;
  // overflow-y: scroll;
  // overflow-x: hidden;
  // }
  // @media screen and (min-width: 1500px) {
  // .content {
  //   width: 1200px;
  //   top: 0;
  //   bottom: 0;
  //   overflow: auto;
  // }
  // }
}
</style>
