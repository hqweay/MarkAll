import db from '#/db/datastore';


// 获取 条目
export function getItems(): Array<ItemType> {
  // console.log(db.get('items').value())
  return db.read().get('items').value();
  // return db.read().get('items').take(1).takeRight(5).value();
}

export function getItemsByPage(page: number, pageSize: number): Array<ItemType> {
  // console.log(db.get('items').value())
  // return db.read().get('items').value();
  console.log(page)
  // @ts-ignore
  return db.read().get('items').take(page).takeRight(pageSize).value()
}

// lowdb 不支持深查询
// update 现在这样应该就是深查询了吧 没错 就是!!cool
// filter 会返回所有匹配值
// find 只返回一个
// 根据 条目的 name 获取 条目
// 应该获取多个 因为 不同的类别可能有多个 条目名相同的不同条目
// 唯一性 则由 id 来保证
// 这个得改改！！！！！
export function getItemByName(name: string): ItemType {
  // console.log(db.read().get('items').filter(["style.name", "测试"]).value());
  //@ts-ignore
  return db.read().get('items').filter(['style.name', name]).value()
  // 这个似乎可以用 takewhile() 
}

// 通过 id 获取 item
export function getItemByID(id: string): ItemType {
  // @ts-ignore
  return db.read().get('items').getById(id).value();
}

// 通过 模板名 获取 条目
export function getItemsByTemplateName(temName: string): ItemType[] {
  // @ts-ignore
  return db.read().get('items').filter({ template_name: temName }).value()
}

// 通过 标签名 获取 条目
// bug 应该判断 tagName 是否在 tag 列表里
export function getItemsByTagName(tagName: string): Array<ItemType> {
  // 我可太他妈聪明了
  // @ts-ignore
  return db.read().get('items').filter(function (o: any) {
    // console.log(tagName);
    if (o.tags.indexOf(tagName) !== -1) {
      // console.log("true");
      return true;
    } else {
      // console.log("false");
      return false;
    }
  }).value()
}

// 添加 条目
export function addItem(newItem: ItemType): boolean {
  // 插入数据前先判断是否已有数据
  // 因为 id 会变化 所以不能直接通过 对象 判断

  // 我可太聪明了

  // 判断是否存在
  // @ts-ignore
  if (db.read().get('items').find({ template_name: newItem.template_name }).value() != null) {
    // @ts-ignore
    if (db.read().get('items').find(['style_content', newItem.style_content]).value() != null) {
      return false;
    }
  }
  // @ts-ignore
  db.read().get('items').insert(newItem).write()
  return true;
}

// 删除 条目
export function deleteItemByID(id: string): boolean {
  db.read().get('items')
    // @ts-ignore
    .removeById(id)
    .write();
  return true;
}

// 通过 id 修改 条目
export function editItemByID(item: ItemType): boolean {
  // 不能这样判断
  // if (db.read().get('items').find({ id: newItem.id }).value() != null) {
  //     return false;
  // }
  // 未进行修改
  // @ts-ignore
  // if (db.read().get('items').find(item).value() != null) {
  //   return false;
  // }
  // 判断 模板名+条目名
  // 不能直接判断,因为有 id 影响

  // bug
  // 应该允许重名啊!!
  // if (db.read().get('items').find({ template_name: item.template_name }).value() != null) {
  //     if (db.read().get('items').find(["style.name", item.style_content.name]).value() != null) {
  //         return 1;
  //     }
  // }


  // db.read().get('items').value().getById(item.id).assign({
  //   template_name: item.template_name,
  //   style: item.style_content,
  //   tags: item.tags
  // }).write();
  //@ts-ignore
  db.read().get('items').updateById(item.id, {
    template_name: item.template_name,
    style_content: item.style_content,
    tags: item.tags
  }).write();
  return true;
}
