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

    db.read().get('tag').insert(newTag).write();
}
// 删除 标签
export function deleteTagByName(tagName) {
    db.read().get('tag')
        .remove({ name: tagName })
        .write();
}

// 修改标签
export function editTagByName(oldName, newTag) {

    if (db.read().get('tag').find({ name: newTag.name }).value() != null) {
        return false;
    }

    db.read().get('tag').find({ name: oldName }).assign({
        name: newTag.name,
    }).write()
}