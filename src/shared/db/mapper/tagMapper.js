import db from '../datastore'

// 获取 标签
export function getTags() {
    return db.get('tag').value();
}
// 添加 标签
export function addTag(newTag) {
    // 操作前通过 get 更新数据保证为最新数据
    db.read().get('tag').value()
    // 插入数据前先判断是否已有数据
    if (db.get('tag').find({ name: newTag.name }).value() != null) {
        return false;
    }

    db.get('tag').push(newTag).write();
}
// 删除 标签
export function deleteTagByName(tagName) {
    db.read().get('tag').value();
    db.get('tag')
        .remove({ name: tagName })
        .write();
}