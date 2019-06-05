import db from '../datastore'

// 获取 条目
export function getItems() {
    // console.log(db.get('item').value())
    return db.read().get('item').value();
}

// 通过 templateName 和 name 获取条目
// 做不到
// lowdb 不支持深查询
export function getItemByName(templateName, name) {
    //"template_name": templateName, 
    // "template_name": templateName, "tag_name": "开心",
    console.log(name);
    return db.read().get('item').filter({
        "template_style.name": "测试"
    }).value();

    // return db.read().get('item').find({ "template_name": templateName, "template_style.name": name }).value();
}

// 通过 id 获取 item
export function getItemByID(id) {
    return db.read().get('item').getById(id).value()
}

// 添加 条目
export function addItem(newTag) {
    // 插入数据前先判断是否已有数据
    if (db.read().get('tag').find({ name: newTag.name }).value() != null) {
        return false;
    }

    db.read().get('tag').push(newTag).write();
}

// 删除 条目
export function deleteItemByID(id) {
    db.read().get('item')
        .removeById(id)
        .write();
}

// 通过 id 修改 条目
export function editItemByID(id, newItem) {

    if (db.read().get('item').find({ id: newItem.id }).value() != null) {
        return false;
    }

    db.read().get('item').getById(id).assign({
        template_name: newItem.template_name,
        template_style: newItem.template_style,
        tag_name: newItem.tag_name
    }).write()
}