import db from '#/db/datastore';

// 获取 标签
export function getTags(): Array<string> {
  return db.read().get('tags').value()
}
// 添加 标签
// todo 修改逻辑
export function addTag(tagName: string): boolean {
  // 插入数据前先判断是否已有数据
  // @ts-ignore
  if (db.read().get('tags').find(function (n) {
    return n === tagName
  }).value() != null) {
    return false
  }
  // tag 的添加不用 insert
  // 无需 id, name 就可以保证唯一性
  // @ts-ignore
  db.read().get('tags').push(tagName).write()
  return true;
}
// 删除 标签
export function deleteTagByName(tagName: string): boolean {
  try {
    // db.read().get('tags')
    //     .remove(tagName)
    //     .write();
    // db.unset('tag.' + tagName)
    //     .write()
    db.read().get('tags')
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
export function editTagByName(oldName: string, newTag: string) {
  // 修改前先判断是否重复
  // if (db.read().get('tags').find({ name: newTag.name }).value() != null) {
  // @ts-ignore
  if (db.read().get('tags').find(newTag).value() != null) {
    return false
  }
  // @ts-ignore
  db.read().get('tags').find({ name: oldName }).assign({
    name: newTag
  }).write()
}
