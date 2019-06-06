import db from '../datastore'

// 获取 模板
export function getTemplates() {
    return db.read().get('template').value();
}

// 通过 name 获取 模板
export function getTemplateByName(temName) {
    return db.read().get('template').find({ name: temName }).value();
}

// 通过 id 获取 模板
export function getTemplateByID(temID) {
    return db.read().get('template').getById(temID)
        .value();
}

// 修改模板
// 判断错误 todo
export function editTemplateByName(oldName, newTemplate) {
    // 修改前需要判断一下新的与旧的是否重复
    if (db.read().get('template').find(newTemplate).value() != null) {
        return false;
    }

    db.read().get('template').find({ name: oldName }).assign({
        name: newTemplate.name,
        style: newTemplate.style
    }).write()
}

// 删除模板
export function deleteTemplateByName(oldName) {
    db.read().get('template')
        .remove({ name: oldName })
        .write();
}

// 添加模板
export function addTemplate(template) {
    // 插入数据前先判断是否已有数据
    if (db.read().get('template').find({ name: template.name }).value() != null) {
        return false;
    }
    // lowdb 提供了 push
    // insert 可以隐式添加 id,是由 lodash-id 提供的
    db.read().get('template').push(template).write();
}