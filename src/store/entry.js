import { observable, action } from 'mobx'


class Entry {
  @observable loading = false
  @observable drawerArr = {};

  @action.bound
  async getDrawerArr() {
    this.loading = true;
    try {
      this.drawerArr = {
        'darwer_l':[
          {title: '个性装扮',  extra: '默认套装'},
          {title: '消息中心',  extra: ''},
          {title: '免流量服务',  extra: ''},
        ],
        'darwer_z':[
          {title: '定时关闭',  extra: false},
          {title: '仅Wi-Fi联网',  extra: false},
          {title: '流量提醒',  extra: false},
          {title: '听歌偏好',  extra: ''},
        ],
        'darwer_x':[
          {title: '微云音乐网盘',  extra: ''},
          {title: '导入外部歌单',  extra: ''},
          {title: '清理占用空间',  extra: ''},
          {title: '帮助与反馈',  extra: ''},
          {title: '关于QQ音乐',  extra: ''},
        ],
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  };
}

export default new Entry();