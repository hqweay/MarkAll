import db from '../datastore'

// 获取 标签
export function getTags() {
    return db.read().get('tag').value();
}
// 添加 标签
export function addTag(newTag) {
    // 插入数据前先判断是否已有数据
    if (db.read().get('tag').find({ name: newTag.name }).value() != null) {
        return false;
    }
    // tag 的添加不用 insert
    // 无需 id, name 就可以保证唯一性
    db.read().get('tag').push(newTag).write();
}
// 删除 标签
export function deleteTagByName(tagName) {
    db.read().get('tag')
        .remove({ name: tagName })
        .write();
}

// 修改标签
export function editTagByName(oldName, newTag) {
    // 修改前先判断是否重复
    // if (db.read().get('tag').find({ name: newTag.name }).value() != null) {
    if (db.read().get('tag').find(newTag).value() != null) {
        return false;
    }

    db.read().get('tag').find({ name: oldName }).assign({
        name: newTag.name,
    }).write()
}