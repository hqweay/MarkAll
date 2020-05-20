import itemMapper from "#/db/mapper/itemMapper";
import templateMapper from "#/db/mapper/templateMapper";
import tagMapper from "#/db/mapper/tagMapper";
// import userMapper from "#/db/mapper/userMapper";
import settingMapper from '~/universal/db/mapper/settingMapper';
import _ from "lodash";
class statisticsService {
  getItemsCount(): number {
    return itemMapper.getItemsCount();
  }
  getTemplatesCount(): number {
    return templateMapper.getTemplatesCount();
  }
  getTagsCount(): number {

    return tagMapper.getTagsCount();
  }
  getItemsGroupByTemplate() {
    let echartsInfo = [];
    let items = itemMapper.getItemsGroupByTemplate();
    for (let index in items) {
      // newItems.set(templateMapper.getTemplateByID(index).name.toString(), items[index].length.toString());
      let newItem = {
        "value": items[index].length,
        "name": templateMapper.getTemplateByID(index).name.toString()
      };
      echartsInfo.push(newItem);
    }
    return echartsInfo;
  }
  getItemsGroupByYear() {
    let years = [];
    let data = [];
    let items = itemMapper.getItemsGroupByCteatedYear();
    for (let index in items) {
      // let newItem = {
      //   "value": items[index].length,
      //   "name": index
      // };
      // echartsInfo.push(newItem);
      years.push(index);
      data.push(items[index].length);
    }
    return {
      years: years,
      data: data
    };
  }
  getItemsGroupByMonth() {
    let months = [];
    let data = [];
    let items = itemMapper.getItemsGroupByCteatedMonth();
    for (let index in items) {
      months.push(index);
      data.push(items[index].length);
    }
    return {
      months: months,
      data: data
    };
  }
  getItemsGroupByDay() {
    let days = [];
    let data = [];
    let items = itemMapper.getItemsGroupByCteatedDay();
    for (let index in items) {
      days.push(index);
      data.push(items[index].length);
    }
    return {
      days: days,
      data: data
    };
  }
  getItemsGroupByDate() {
    let dates = [];
    let data = [];
    let items = itemMapper.getItemsGroupByCteatedDate();
    for (let index in items) {
      // console.log(index)
      dates.push(index);
      data.push(items[index].length);
    }
    return {
      dates: _.chain(dates).takeRight(7).value(),
      data: _.chain(data).takeRight(7).value()
    };
  }
  getStatisticsInfo(): any {
    // console.log("+++++++++++++++++++++")
    // console.log(this.getItemsGroupByDate())
    return {
      user: settingMapper.getUser(),
      item: {
        count: this.getItemsCount(),
        groupByTemplate: this.getItemsGroupByTemplate(),
        groupByYear: this.getItemsGroupByYear(),
        groupByMonth: this.getItemsGroupByMonth(),
        groupByDay: this.getItemsGroupByDay(),
        groupByDate: this.getItemsGroupByDate()
      }, template: {
        count: this.getTemplatesCount()
      }, tag: {
        count: this.getTagsCount()
      }
    }
  }
}

export default new statisticsService();