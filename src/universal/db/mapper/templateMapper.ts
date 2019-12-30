import db from '../datastore'

// 获取 模板
export function getTemplates() {
  return db.read().get('templates').value()
}

// 通过 name 获取 模板
export function getTemplateByName(temName: string): TemplateType {
  // @ts-ignore
  return db.read().get('templates').find({ name: temName }).value()
}

// 没必要
// 通过 id 获取 模板
// export function getTemplateByID(temID: string) {
//   return db.read().get('templates').getById(temID)
//     .value()
// }

// 修改模板
// 判断错误 todo
export function editTemplateByName(oldName: string, newTemplate: TemplateType) {
  // 修改前需要判断一下新的与旧的是否重复
  // @ts-ignore
  if (db.read().get('templates').find(newTemplate).value() != null) {
    return false
  }

  // @ts-ignore
  db.read().get('templates').find({ name: oldName }).assign({
    name: newTemplate.name,
    style: newTemplate.style
  }).write()
}

// 删除模板
export function deleteTemplateByName(oldName: string): boolean {
  try {
    db.read().get('templates')
      // @ts-ignore
      .remove({ name: oldName })
      .write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// 添加模板
export function addTemplate(template: TemplateType): boolean {
  // 插入数据前先判断是否已有数
  // @ts-ignore据
  if (db.read().get('templates').find({ name: template.name }).value() != null) {
    return false
  }
  // lowdb 提供了 push
  // insert 可以隐式添加 id,是由 lodash-id 提供的
  // @ts-ignore
  db.read().get('templates').push(template).write()
  return true;
}
