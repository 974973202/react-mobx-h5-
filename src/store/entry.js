import { observable, action } from 'mobx'


class Entry {
  @observable loading = false
  @observable drawerArr = {};
  @observable music = [];

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

  @action.bound
  async getMusic() {
    this.loading = true;
    try {
      this.music = [
          {
              image: require("../assets/music/song_1.jpg"),
              audio: require("../assets/music/song_1.mp3"),
              song: "丑八怪",
              album: "意外",
              singer: "薛之谦",
              duration: 253,
              isLike: true
          },
          {
              image: require("../assets/music/song_2.jpg"),
              audio: require("../assets/music/song_2.mp3"),
              song: "小半",
              album: "小梦大半",
              singer: "陈粒",
              duration: 297,
              isLike: false
          },
          {
              image: require("../assets/music/song_3.jpg"),
              audio: require("../assets/music/song_3.mp3"),
              song: "Shape of You",
              album: "÷",
              singer: "ed sheeran",
              duration: 235,
              isLike: false
          }
      ]
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }
}

export default new Entry();