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
    // console.log(db.read().get('item').filter(["template_style.name", "测试"]).value());
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

// 通过 标签名 获取 条目
// bug 应该判断 tagName 是否在 tag 列表里
export function getItemsByTagName(tagName) {
    // 我可太他妈聪明了
    return db.read().get('item').filter(function (o) {
        // console.log(tagName);
        if (o.tag_name.indexOf(tagName) !== -1) {
            // console.log("true");
            return true;
        } else {
            // console.log("false");
            return false;
        }
    }).value();
}


// 添加 条目
export function addItem(newItem) {
    // 插入数据前先判断是否已有数据
    // 因为 id 会变化 所以不能直接通过 对象 判断


    // 也不能简单地通过 name 判断
    // 如果要判断的话应该对 template_style 的每一项进行判断!!
    // if (db.read().get('item').find({ template_name: newItem.template_name }).value() != null) {
    //     if (db.read().get('item').find(["template_style.name", newItem.template_style.name]).value() != null) {
    //         return false;
    //     }
    // }

    // 太麻烦了,,算了...

    db.read().get('item').insert(newItem).write();
}

// 删除 条目
export function deleteItemByID(id) {
    db.read().get('item')
        .removeById(id)
        .write();
}

// 通过 id 修改 条目
export function editItemByID(item) {

    // 不能这样判断
    // if (db.read().get('item').find({ id: newItem.id }).value() != null) {
    //     return false;
    // }
    if (db.read().get('item').find(item).value() != null) {
        return 0;
    }
    // 判断 模板名+条目名
    // 不能直接判断,因为有 id 影响


    // bug
    // 应该允许重名啊!!
    // if (db.read().get('item').find({ template_name: item.template_name }).value() != null) {
    //     if (db.read().get('item').find(["template_style.name", item.template_style.name]).value() != null) {
    //         return 1;
    //     }
    // }

    db.read().get('item').getById(item.id).assign({
        template_name: item.template_name,
        template_style: item.template_style,
        tag_name: item.tag_name
    }).write()
}