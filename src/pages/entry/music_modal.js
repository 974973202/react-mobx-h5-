import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './music_modal.less';

class MusicModal extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.song_img}>
          <div className={styles.img_wrapper}>
            <img src="" alt="" />
          </div>
        </div>
        <div className={styles.song_info}>
            
        </div>
        <div className={styles.pro}>
          <div className={styles.cur_time}>00:00</div>
            <div className={styles.pro_wrapper}>
              <div className={styles.pro_bottom}></div>
              <div className={styles.pro_top}>
                <div className={styles.slider_point}></div>
              </div>
            </div>
          <div className={styles.all_time}>04:10</div>
        </div>
        <div className={styles.control}>
          <div className={classNames(styles.btn_wrapper, styles.like_btn)}></div>
          <div className={classNames(styles.btn_wrapper, styles.prev_btn)}></div>
          <div className={classNames(styles.btn_wrapper, styles.play_btn)}></div>
          <div className={classNames(styles.btn_wrapper, styles.next_btn)}></div>
          <div className={classNames(styles.btn_wrapper, styles.list_btn)}></div>
        </div>
      </div>
    )
  }
}

export default MusicModal;