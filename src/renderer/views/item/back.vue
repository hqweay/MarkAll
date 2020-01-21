 <div class="add-container">
        <!-- <div class="test"> -->
        <el-row type="flex" align="middle">
          <el-col>
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <!-- <span>{{item.template_style.name}}</span> -->
                <span>条目信息</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="showStyle()"
                >{{style.message}}</el-button>
              </div>
              <ul v-for="styleItem in this.item.style" :key="styleItem.name">
                <li>{{ styleItem }}</li>
              </ul>

              <!-- <el-collapse-transition>
                <div v-if="style.isShow == true" class="style">
                  <pre class="json">{{ item }}</pre>
                </div>
              </el-collapse-transition>-->

              <!-- 遍历项，根据不同 type 渲染不同效果。 -->
            </el-card>
          </el-col>
        </el-row>
      </div>