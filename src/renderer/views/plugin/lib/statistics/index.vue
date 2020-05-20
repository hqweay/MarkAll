<template>
  <div class="statistics">
    <div class="header">
      <h2>{{this.statisticsInfo.user.name}}</h2>
      <div class="avatar">
        <el-image style="width: 100px;" :src="'file://'+ this.statisticsInfo.user.avatar">
          <div slot="error" class="image-slot">
            <el-image :src="require('@/assets/images/logo.png')"></el-image>
          </div>
        </el-image>
      </div>

      <div class="info">
        你在这儿共有 {{this.statisticsInfo.template.count}} 个模板、 {{this.statisticsInfo.item.count}} 个条目、
        {{this.statisticsInfo.tag.count}} 个标签。
      </div>
    </div>
    <div class="content">
      <div class="items">
        <div class="bydate">
          <h3>最近七天标记</h3>
          <v-chart :options="lineItemsGroupByDate" />
          <h2>标记数量分布</h2>
          <h3>按年统计</h3>
          <v-chart :options="lineItemsGroupByYear" />
          <h3>按月统计</h3>
          <v-chart :options="lineItemsGroupByMonth" />
          <h3>按日统计</h3>
          <v-chart :options="lineItemsGroupByDay" />
        </div>
        <div class="groupbytemplate">
          <h2>条目在模板中的分布</h2>
          <v-chart :options="pieItemsGroupByTemplate" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { remote, ipcRenderer } from "electron";
import settingMapper from "#/db/mapper/settingMapper";
import statisticsService from "./statisticsService";
import defaultChartsService from "./defaultChartsService";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";

@Component({
  name: "plugin-douban"
})
export default class extends Vue {
  statisticsInfo: any = {};
  pieItemsGroupByTemplate = defaultChartsService.getPieItemsGroupByTemplate();
  lineItemsGroupByYear = defaultChartsService.getLineItemsGroupByYear();
  lineItemsGroupByMonth = defaultChartsService.getLineItemsGroupByMonth();
  lineItemsGroupByDay = defaultChartsService.getLineItemsGroupByDay();
  lineItemsGroupByDate = defaultChartsService.getLineItemsGroupByDate();
  created() {
    this.statisticsInfo = statisticsService.getStatisticsInfo();
    // console.log(this.statisticsInfo.item.getLineItemsGroupByYear);
    this.pieItemsGroupByTemplate.series[0].data = this.statisticsInfo.item.groupByTemplate;
    // date
    this.lineItemsGroupByDate.xAxis.data = this.statisticsInfo.item.groupByDate.dates;
    this.lineItemsGroupByDate.series[0].data = this.statisticsInfo.item.groupByDate.data;

    //  Year
    this.lineItemsGroupByYear.xAxis.data = this.statisticsInfo.item.groupByYear.years;
    this.lineItemsGroupByYear.series[0].data = this.statisticsInfo.item.groupByYear.data;
    //  month
    this.lineItemsGroupByMonth.xAxis.data = this.statisticsInfo.item.groupByMonth.months;
    this.lineItemsGroupByMonth.series[0].data = this.statisticsInfo.item.groupByMonth.data;
    //  day
    this.lineItemsGroupByDay.xAxis.data = this.statisticsInfo.item.groupByDay.days;
    this.lineItemsGroupByDay.series[0].data = this.statisticsInfo.item.groupByDay.data;
  }
}
</script>
<style scoped lang="scss">
.statistics {
  text-align: center;
  margin-left: 15%;
  margin-right: 15%;
  h2,
  h3,
  .info {
    text-align: left;
  }
  .header {
    .avatar {
      .el-image {
        border-radius: 10px;
      }
    }
  }
  .content {
    // .echarts {
    //   margin: 0 auto;
    // }
  }
}
</style>
