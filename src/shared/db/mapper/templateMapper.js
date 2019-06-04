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