import DB from '#/db/datastore';


class templateMapper {
  private db = DB;
  // 获取 模板
  getTemplates() {
    return this.db.read().get('templates').reverse().value()
  }

  // 通过 name 获取 模板
  getTemplateByName(temName: string): TemplateType {
    // @ts-ignore
    return this.db.read().get('templates').find({ name: temName }).value()
  }

  // 通过 id 获取 模板
  getTemplateByID(id: string): TemplateType {
    // @ts-ignore
    return this.db.read().get('templates').getById(id).value();
  }


  editTemplateByID(template: TemplateType) {
    //@ts-ignore
    this.db.read().get('templates').updateById(template.id, {
      name: template.name,
      style: template.style
    }).write();
    return true;
  }

  // 没必要
  // 通过 id 获取 模板
  // getTemplateByID(temID: string) {
  //   return this.db.read().get('templates').getById(temID)
  //     .value()
  // }

  // 修改模板
  // 判断错误 todo
  editTemplateByName(oldName: string, newTemplate: TemplateType) {
    // 修改前需要判断一下新的与旧的是否重复
    // 判断整个 template 对象没太大价值，判断 template 名就行了
    // @ts-ignore
    // if (this.db.read().get('templates').find(newTemplate).value() != null) {
    //   return false
    // }
    // 若修改了 template 名
    if (oldName != newTemplate.name) {
      if (this.hasTemplateName(newTemplate.name)) {
        return false;
      }
    }

    // @ts-ignore
    this.db.read().get('templates').find({ name: oldName }).assign({
      name: newTemplate.name,
      style: newTemplate.style
    }).write();
    return true;
  }
  // 是否存在 template name
  hasTemplateName(templateName: string): boolean {
    //@ts-ignore
    return this.db.read().get('templates').filter({ name: templateName }).value().length === 0 ? false : true;
  }

  // 删除模板
  deleteTemplateByName(oldName: string): boolean {
    try {
      this.db.read().get('templates')
        // @ts-ignore
        .remove({ name: oldName })
        .write();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // 添加模板
  addTemplate(template: TemplateType): boolean {
    // 插入数据前先判断是否已有数
    // @ts-ignore据
    if (this.db.read().get('templates').find({ name: template.name }).value() != null) {
      return false
    }
    // lowdb 提供了 push
    // insert 可以隐式添加 id,是由 lodash-id 提供的
    // @ts-ignore
    this.db.read().get('templates').insert(template).write();
    return true;
  }
}
export default new templateMapper(); //暴露出去