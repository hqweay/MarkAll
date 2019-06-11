import db from '../datastore'

// 获取 标签
export function getTags() {
    return db.read().get('tag').value();
}
// 添加 标签
// todo 修改逻辑
export function addTag(tagName) {
    // 插入数据前先判断是否已有数据
    if (db.read().get('tag').find(function (n) {
        return n === tagName;
    }).value() != null) {
        return false;
    }
    // tag 的添加不用 insert
    // 无需 id, name 就可以保证唯一性
    db.read().get('tag').push(tagName).write();
}
// 删除 标签
export function deleteTagByName(tagName) {
    // db.read().get('tag')
    //     .remove(tagName)
    //     .write();
    // db.unset('tag.' + tagName)
    //     .write()
    db.read().get('tag')
        .remove(function (n) {
            // console.log(n);
            // console.log(tagName);
            return n === tagName;
        })
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