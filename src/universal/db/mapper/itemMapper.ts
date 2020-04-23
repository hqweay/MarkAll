import DB from '#/db/datastore';


class itemMapper {
  private db = DB;
  // 获取 条目
  getItems(): Array<ItemType> {
    // 按创建时间逆序 .sortBy('created_time')
    let items = this.db.read().get('items').reverse().value();
    // console.log(items);
    return items;
    // return this.db.read().get('items').take(1).takeRight(5).value();
  }

  getItemsByPage(page: number, pageSize: number): Array<ItemType> {
    // console.log(this.db.get('items').value())
    // return this.db.read().get('items').value();
    console.log(page)
    // @ts-ignore
    return this.db.read().get('items').take(page).takeRight(pageSize).value();

  }

  // lowthis.db 不支持深查询
  // update 现在这样应该就是深查询了吧 没错 就是!!cool
  // filter 会返回所有匹配值
  // find 只返回一个
  // 根据 条目的 name 获取 条目
  // 应该获取多个 因为 不同的类别可能有多个 条目名相同的不同条目
  // 唯一性 则由 id 来保证
  // 这个得改改！！！！！
  getItemsByName(name: string): ItemType {
    // console.log(this.db.read().get('items').filter(["style.name", "测试"]).value());
    //@ts-ignore
    return this.db.read().get('items').filter(['style.name', name]).value()
    // 这个似乎可以用 takewhile() 
  }

  // 通过 id 获取 item
  getItemByID(id: string): ItemType {
    // @ts-ignore
    return this.db.read().get('items').getById(id).value();
  }

  // 通过 模板名 获取 条目
  // getItemsByTemplateName(temName: string): ItemType[] {
  //   // @ts-ignore
  //   return this.db.read().get('items').filter({ template_name: temName }).reverse().value();
  // }
  // 通过 模板 ID 获取 条目
  getItemsByTemplateID(temID: string): ItemType[] {
    // @ts-ignore
    return this.db.read().get('items').filter({ template_id: temID }).reverse().value();
  }

  // 通过 标签名 获取 条目
  // bug 应该判断 tagName 是否在 tag 列表里
  getItemsByTagName(tagName: string): ItemType[] {
    // 我可太他妈聪明了
    // @ts-ignore
    return this.db.read().get('items').filter(function (o: any) {
      // console.log(tagName);
      if (o.tags.indexOf(tagName) !== -1) {
        // console.log("true");
        return true;
      } else {
        // console.log("false");
        return false;
      }
    }).reverse().value();
  }

  // 添加 条目
  addItem(newItem: ItemType): boolean {
    // 插入数据前先判断是否已有数据
    // 因为 id 会变化 所以不能直接通过 对象 判断

    // 我可太聪明了

    // 判断是否存在
    // @ts-ignore
    if (this.db.read().get('items').find({ template_id: newItem.template_id }).value() != null) {
      // @ts-ignore
      if (this.db.read().get('items').find(['style_content', newItem.style_content]).value() != null) {
        return false;
      }
    }
    // @ts-ignore
    this.db.read().get('items').insert(newItem).write()
    return true;
  }

  // 删除 条目
  deleteItemByID(id: string): boolean {
    this.db.read().get('items')
      // @ts-ignore
      .removeById(id)
      .write();
    return true;
  }

  // 通过 id 修改 条目
  editItemByID(item: ItemType): boolean {
    // 不能这样判断
    // if (this.db.read().get('items').find({ id: newItem.id }).value() != null) {
    //     return false;
    // }
    // 未进行修改
    // @ts-ignore
    // if (this.db.read().get('items').find(item).value() != null) {
    //   return false;
    // }
    // 判断 模板名+条目名
    // 不能直接判断,因为有 id 影响

    // bug
    // 应该允许重名啊!!
    // if (this.db.read().get('items').find({ template_name: item.template_name }).value() != null) {
    //     if (this.db.read().get('items').find(["style.name", item.style_content.name]).value() != null) {
    //         return 1;
    //     }
    // }


    // this.db.read().get('items').value().getById(item.id).assign({
    //   template_name: item.template_name,
    //   style: item.style_content,
    //   tags: item.tags
    // }).write();
    //@ts-ignore
    this.db.read().get('items').updateById(item.id, {
      template_id: item.template_id,
      updated_time: item.updated_time,
      style_content: item.style_content,
      tags: item.tags
    }).write();
    return true;
  }
}

export default new itemMapper(); //暴露出去