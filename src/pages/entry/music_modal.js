import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import styles from './music_modal.less';
import { BlurImg } from '../../util/gaussBlur';

@inject(store => ({
  entry: store.entry,
  loading: store.entry.loading,
}))
@observer
class MusicModal extends Component {
  @observable index = 0;  // 获取歌曲索引
  @observable playBtn = true;  // 显示暂停还是播放按钮
  @observable status = 'pause';  // 判断当前歌曲播放还是暂停状态
  @observable audio = new Audio();  // 全局创建audio播放器
  @observable duration = 0;  // 
  @observable startTime = 0;
  @observable timer = null;
  @observable lastper = 0;
  @observable beginMusicTime = '00:00';

  componentDidMount() {
    const { entry } = this.props;
    entry.getMusic();
    const { music } = entry;
    this.music = music;
    this.renderImg(music[this.index].image);
    this.renderAllTime(music[this.index].duration)
  }

  componentDidUpdate(){
    const { entry } = this.props;
    const { music } = entry;
    this.renderImg(music[this.index].image)
    this.formatTime(music[this.index].duration)
  }

  @action  // 切歌lastper置零
  renderAllTime(time){
    this.lastper = 0;
    this.formatTime(time)
  }

  // 处理时间
  @action
  formatTime(time) {
    let duration = Math.round(time);
    if(Number.isInteger(time)) {
      this.duration = duration;
    }
    let minute = Math.floor(duration / 60);
    let second = duration - minute * 60;
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }
    return minute + ":" +second;
  }

  @action
  handlePrev = () => {
    if(this.status === 'play') {
      this.audio.pause()
      this.handleStop()
      this.status = 'pause'
      this.playBtn = true
    }
    const { music } = this.props.entry;
    this.handleUpdate(0, music[this.index].duration);
    this.renderAllTime(music[this.index].duration)
    
    if(this.index === 0) {
      this.index = music.length - 1;
    } else {
      this.index = this.index - 1;
    }
  }

  @action
  handlePlay = (lastper) => {
    this.playBtn = !this.playBtn;
    const { music } = this.props.entry;
    this.audio.src = music[this.index].audio;
    this.audio.currentTime = lastper
    if(this.status === 'pause') {
      this.audio.play()
      this.handleStartTime()
      this.status = 'play'
    } else {
      this.audio.pause()
      this.handleStop()
      this.status = 'pause'
    }
  }

  @action
  handleStop = () => {
    // 暂停时间记录
    let stopTime = new Date().getTime();
    let lastper = this.lastper + (stopTime - this.startTime) / (this.duration * 1000);
    this.lastper = lastper;
    cancelAnimationFrame(this.timer);
  }

  @action
  handleNext = () => {
    if(this.status === 'play') {
      this.audio.pause()
      this.handleStop()
      this.status = 'pause'
      this.playBtn = true
    }
    const { music } = this.props.entry;
    this.handleUpdate(0, music[this.index].duration);
    this.renderAllTime(music[this.index].duration)
    
    if(this.index === music.length  -1) {
      this.index = 0;
    }else {
      this.index = this.index + 1;
    }
  }

  @action  // 计算开始播放时间
  handleStartTime() {
    const { duration, lastper } = this
    let startTime = new Date().getTime();
    this.startTime = startTime;
    function handleFrame(){
      let curTime = new Date().getTime();
      let percent = lastper + (curTime - startTime) / (duration * 1000);
      console.log(lastper, percent)
      if(percent < 1) {
        this.timer = requestAnimationFrame(() => handleFrame.apply(this))
        this.handleUpdate(percent, duration)
      } else {
        cancelAnimationFrame(this.timer)
      }
    }
    handleFrame.apply(this)
  }

  @action  // 开始播放更新的时间
  handleUpdate(percent, duration) {
    let curTime = percent * duration;
    this.beginMusicTime = this.formatTime(curTime)
    //进度条
    let per = (percent - 1) * 100 + '%';
    document.getElementById('pro_top').setAttribute('style', `transform: translateX(${per})`)
  }

  @action
  handleTouchStart = () => {
    if(this.status === 'play') {
      this.audio.pause()
      this.handleStop()
      this.status = 'pause'
      this.playBtn = true
    }
  }

  @action
  handleTouchMove = (e) => {
    let left = document.getElementById('pro_wrapper').offsetLeft
    let width = document.getElementById('pro_wrapper').offsetWidth
    let x = e.changedTouches[0].clientX
    let per = (x - left) / width;
    const { music } = this.props.entry;
    this.handleUpdate(per, music[this.index].duration);
  }

  @action
  handleTouchEnd = (e) => {
    let left = document.getElementById('pro_wrapper').offsetLeft
    let width = document.getElementById('pro_wrapper').offsetWidth
    let x = e.changedTouches[0].clientX
    let per = (x - left) / width;
    const { music } = this.props.entry;
    let lastper = per * music[this.index].duration;
    this.lastper = lastper
    this.handlePlay(lastper)

  }

  // @action
  // handlePlayTo(lastper) {
  //   const { music } = this.props.entry;
  //   this.audio.src = music[this.index].audio;
  //   this.audio.currentTime = lastper
  //   this.audio.play()
  //   this.status = 'play'
  //   this.playBtn = false
  // }

  @action  // 高斯模糊
  renderImg(src) {
    const Img = new Image();
    Img.src = src;
    Img.onload = () => {
      BlurImg(Img, document.getElementById('music_modal'))
    }
  }

  render() {
    const { index, playBtn } = this
    const { music, loading } = this.props.entry;
    if(!music[index]) {
      return null;
    }
    const { btn_wrapper, like_btn, liking, play_btn, playing } = styles;
    const isLike = music[index].isLike ? liking : like_btn;
    const isPlay = playBtn ? play_btn : playing;

    return (
      <div id="music_modal" className={styles.wrapper}>
        <div className={styles.song_img}>
          <div className={styles.img_wrapper}>
          { 
            <img src={music[index].image} alt="pic" />
          }
          </div>
        </div>
        <div className={styles.song_info}>
          { 
            <>
              <div className={styles.song_name}>{music[index].song}</div>
              <div className={styles.singer_name}>{music[index].singer}</div>
              <div className={styles.album_name}>{music[index].album}</div>
            </>
          }
        </div>
        <div className={styles.pro}>
          <div className={styles.cur_time}>{this.beginMusicTime}</div>
            <div className={styles.pro_wrapper} id='pro_wrapper'>
              <div className={styles.pro_bottom}></div>
              <div id='pro_top' className={styles.pro_top}>
                <div 
                  className={styles.slider_point} 
                  onTouchStart={this.handleTouchStart}
                  onTouchMove={this.handleTouchMove} 
                  onTouchEnd={this.handleTouchEnd}
                />
              </div>
            </div>
            {
              <div className={styles.all_time}>{this.formatTime(music[this.index].duration)}</div>
            }
        </div>
        <div className={styles.control}>
          <div className={classNames(btn_wrapper, isLike)}></div>
          <div className={classNames(btn_wrapper, styles.prev_btn)} onClick={this.handlePrev}></div>
          <div className={classNames(btn_wrapper, isPlay)} onClick={() => this.handlePlay(this.lastper)}></div>
          <div className={classNames(btn_wrapper, styles.next_btn)} onClick={this.handleNext}></div>
          <div className={classNames(btn_wrapper, styles.list_btn)}></div>
        </div>
      </div>
    )
  }
}

export default MusicModal;