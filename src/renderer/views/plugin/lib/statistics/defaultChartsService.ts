class defaultChartsService {
  getPieItemsGroupByTemplate() {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["电影", "书籍"]
      },
      series: [
        {
          name: "分模板统计信息",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 50, name: "电影" },
            { value: 20, name: "书籍" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
  getLineItemsGroupByYear() {
    return {
      xAxis: {
        type: "category",
        data: ["2020", "2019"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 50],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }
      ]
    };
  }
  getLineItemsGroupByMonth() {
    return {
      xAxis: {
        type: "category",
        data: ["1", "2", "5"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 50, 52],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }
      ]
    };
  }
  getLineItemsGroupByDay() {
    return {
      xAxis: {
        type: "category",
        data: ["1", "2"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 50],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }
      ]
    };
  }
  getLineItemsGroupByDate() {
    return {
      xAxis: {
        type: 'category',
        data: ["2020年5月2日", "2020年5月3日", "2020年5月8日", "2020年5月10日"]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',

        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    };
  }
}
export default new defaultChartsService();