<template>
  <div id="main">
    <el-row :gutter="40" type="flex">
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <div class="siderbar">
            <div class="siderbar-header">
              <div class="search">
                <input type="text" placeholder="搜索" />
              </div>
            </div>
            <div class="siderbar-body">
              <ul>
                <li>
                  <router-link class="tab-item" to="/main/template-list">
                    <span class="tab-link">模板</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/main/tag-list">
                    <span class="tab-link">标签</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/main/item-list">
                    <span class="tab-link">条目</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="tab-item" to="/other">
                    <span class="tab-link">其它</span>
                  </router-link>
                </li>
                <!-- <li>
                  <router-link class="tab-item" to="/item-info">
                    <span class="tab-link">ceui1</span>
                  </router-link>
                </li>-->
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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class extends Vue {}
</script>

<style scoped lang="scss">
#main {
  width: 100%;
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
    overflow: auto;
    // overflow-y: scroll;
    // overflow-x: hidden;
  }
}
</style>
