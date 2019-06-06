import db from '../datastore'

// 获取 条目
export function getItems() {
    // console.log(db.get('item').value())
    return db.read().get('item').value();
}


// lowdb 不支持深查询
// update 现在这样应该就是深查询了吧 没错 就是!!cool
// filter 会返回所有匹配值
// find 只返回一个
// 根据 条目的 name 获取 条目
// 应该获取多个 因为 不同的类别可能有多个 条目名相同的不同条目
// 唯一性 则由 id 来保证
export function getItemByName(name) {
    // console.log(db.read().get('item').filter(["template_name", "豆瓣电影"]).value());
    return db.read().get('item')
        .filter(["template_style.name", name])
        .value();
}

// 通过 id 获取 item
export function getItemByID(id) {
    return db.read().get('item').getById(id).value()
}

// 通过 模板名 获取 条目
export function getItemsByTemplateName(temName) {
    return db.read().get('item').filter({ template_name: temName }).value()
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

    // 不能这样判断
    // if (db.read().get('item').find({ id: newItem.id }).value() != null) {
    //     return false;
    // }
    if (db.read().get('item').find(newItem).value() != null) {
        return false;
    }

    db.read().get('item').getById(id).assign({
        template_name: newItem.template_name,
        template_style: newItem.template_style,
        tag_name: newItem.tag_name
    }).write()
}