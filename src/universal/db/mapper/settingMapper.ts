import DB from '#/db/datastore';


class settingMapper {
  private db = DB;

  getUser(): any {
    let user = this.db.read().get('setting').value().user;
    return user;
  }
  setUser(user: any) {
    this.db.read().set('setting.user', user).write();
  }



}

export default new settingMapper(); //暴露出去