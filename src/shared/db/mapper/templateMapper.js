import db from '../datastore'

// 获取 模板
export function getTemplates() {
    return db.get('template').value();
}

// 通过 name 获取 模板
export function getTemplateByName(temName) {
    return db.get('template').find({ name: temName }).value();
}

// 修改模板
export function editTemplateByName(oldName, newTemplate) {
    // 操作前通过 get 更新数据保证为最新数据
    db.read().get('template').value()
    db.get('template').find({ name: oldName }).assign({
        name: newTemplate.name,
        style: newTemplate.style
    }).write()
}

// 删除模板
export function deleteTemplateByName(oldName) {
    db.read().get('template').value();
    // console.log(oldName);
    db.get('template')
        .remove({ name: oldName })
        .write();
}

// 添加模板
export function addTemplate(template) {
    // 操作前通过 get 更新数据保证为最新数据
    db.read().get('template').value()
    // 插入数据前先判断是否已有数据
    if (db.get('template').find({ name: template.name }).value() != null) {
        return false;
    }
    // insert is not a function
    // 所以要用 push. oh yeah
    db.get('template').push(template).write();
}