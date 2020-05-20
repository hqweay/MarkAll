import DB from '#/db/datastore';


class tagMapper {
  private db = DB;

  getTagsCount(): number {
    return this.db.read().get('tags').size().value();
  }
  // 获取 标签
  getTags(): Array<string> {
    return this.db.read().get('tags').reverse().value()
  }

  // 通过数组添加 tags
  addTags(tags: string[]) {
    // 自动去重
    //@ts-ignore
    this.db.read().set('tags', this.db.read().get('tags').union(tags).value()).write();
  }

  // 添加 标签
  addTag(tagName: string): boolean {
    // 插入数据前先判断是否已有数据
    // @ts-ignore
    if (this.db.read().get('tags').find(function (n) {
      return n === tagName;
    }).value() != null) {
      // if (this.db.read().get('tags').value().indexOf(newTag) !== -1) {
      // console.log("55555555555");
      return false;
    } else {
      // console.log("55555555555666");
      // tag 的添加不用 insert
      // 无需 id, name 就可以保证唯一性
      // @ts-ignore
      this.db.read().get('tags').push(tagName).write();
      return true;
    }

  }
  // 删除 标签
  deleteTagByName(tagName: string): boolean {
    try {
      // this.db.read().get('tags')
      //     .remove(tagName)
      //     .write();
      // this.db.unset('tag.' + tagName)
      //     .write()
      this.db.read().get('tags')
        // @ts-ignore
        .remove(function (n) {
          // console.log(n);
          // console.log(tagName);
          return n === tagName
        })
        .write()
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  // 修改标签
  // 2020-02-19
  editTagByName(oldTag: string, newTag: string): boolean {
    // 修改前先判断是否重复
    // if (this.db.read().get('tags').find({ name: newTag.name }).value() != null) {


    if (this.db.read().get('tags').value().indexOf(newTag) !== -1) {
      return false;
    } else {
      this.deleteTagByName(oldTag);
      //@ts-ignore
      this.db.read().get('tags').push(newTag).write();
      return true;
    }

    // @ts-ignore
    // this.db.read().get('tags').find({ name: oldName }).assign({
    //   name: newTag
    // }).write()
  }

}

export default new tagMapper(); //暴露出去