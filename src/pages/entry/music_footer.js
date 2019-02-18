import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { ActionSheet, Modal, NavBar, Icon } from 'antd-mobile';
import styles from './music_footer.less';
import { BaseIcon, Container, Content } from '../../components/base-style-components';
import MusicModal from './music_modal'

@observer
class MusicFooter extends Component {

  @observable play = false
  @observable musicModal = true

  @action
  handleChangePlay = (e) => {
    e.stopPropagation();
    this.play = !this.play
  }

  @action
  handleChangeMusicModal = () => {
    this.musicModal = !this.musicModal
  }

  @action
  showActionSheet = (e) => {
    e.stopPropagation();
    const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
      className: styles.actionSheet,
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // title: 'title',
      message: <div>123</div>,
      maskClosable: true,
    },
    (buttonIndex) => {
      console.log(buttonIndex)
    });
  }

  render() {
    return (
      <Fragment>
        <div className={styles.musicFooter} onClick={this.handleChangeMusicModal}>
          <div className={styles.header}>
            <div className={styles.headAvitor}>
              <BaseIcon 
                size={40}
                source={require('../../assets/entry/head-photo.jpg')}
                borderRadius={50}
              />
            </div>
            <div className={styles.musicInfo}>
              <p>可不可以</p>
              <p>张紫豪</p>
            </div>
          </div>
          <div className={styles.playlist}>
            {
              this.play ? 
              <BaseIcon 
                size={35}
                source={require('../../assets/entry/icon-pause.png')}
                onClick={this.handleChangePlay}
              /> :
              <BaseIcon 
                size={35}
                source={require('../../assets/entry/icon-play.png')}
                onClick={this.handleChangePlay}
              />
            }
            <BaseIcon 
              size={35}
              source={require('../../assets/entry/icon-playlist.png')}
              onClick={this.showActionSheet}
            />
          </div>
        </div>
        {
          this.musicModal ? 
          <Modal visible={this.musicModal}>
            <Container>
              <NavBar 
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.handleChangeMusicModal}
              >可不可以</NavBar>
              <Content>
                <MusicModal />
              </Content>
            </Container>
          </Modal> : 
          null
        }
      </Fragment>
      
    )
  }
}

export default MusicFooter;