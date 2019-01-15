import React, { lazy, Fragment } from 'react';
import { TabBar, Icon, Popover, Drawer, List, Switch } from 'antd-mobile';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { BaseIcon } from '../../components/base-style-components';
import styles from './index.less';

// const Item = List.Item;

const Me = lazy(() => import('../me'))
const MusicHall = lazy(() => import('../music-hall'))
const Discover = lazy(() => import('../discover'))

const DrawerSidebar = lazy(() => import('./darwer_sidebar'))
const MusicFooter = lazy(() => import('./music_footer'))

const { Item } = Popover;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

@inject(store => ({
  entry: store.entry,
  loading: store.entry.loading,
}))
@observer
class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      hidden: false,
      fullScreen: false,
    };
  }

  @observable selectedTab = 'music-hall';
  @observable open = false;

  componentDidMount() {
    const { entry } = this.props;
    entry.getDrawerArr();
  }

  @action
  handleOnPress(selectedTab) {
    this.selectedTab = selectedTab
  }

  @action
  onOpenChange = (...args) => {
    console.log(args);
    this.open = !this.open
  }

  render() {
    const { drawerArr, loading } = this.props.entry;
    // const { darwer_l, darwer_z, darwer_x } = drawerArr;
    // const sidebar = (
      
    // );

    return (
      <div className={styles.wrapper}>
        <Drawer
          className={styles.drawer}
          enableDragHandle
          contentStyle={{ position: 'fixed', color: '#A6A6A6' }}
          sidebar={<DrawerSidebar drawerArr={drawerArr}/>}
          open={this.open}
          onOpenChange={this.onOpenChange}
          touch={true}
          transitions={true}
        >

        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="top"
        >
          <TabBar.Item 
            onPress={this.onOpenChange}
            icon={<BaseIcon size={22} source={require('../../assets/entry/drawer_d.png')}/>}
          />
          <TabBar.Item
            title="我的"
            key="me"
            dot
            icon={
              <BaseIcon
                source={require('../../assets/entry/me_n@2x.png')}
                size={22}
              />
            }
            selectedIcon={
              <BaseIcon
                source={require('../../assets/entry/me_s@2x.png')}
                size={22}
              />
            }
            selected={this.selectedTab === 'me'}
            onPress={() => this.handleOnPress('me')}
          >
            <Me />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="音乐馆"
            key="music-hall"
            badge={'new'}
            selected={this.selectedTab === 'music-hall'}
            onPress={() => this.handleOnPress('music-hall')}
          >
            <MusicHall />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <BaseIcon
                source={require('../../assets/entry/discover_n@2x.png')}
                size={22}
              />
            }
            selectedIcon={
              <BaseIcon
                source={require('../../assets/entry/discover_s@2x.png')}
                size={22}
              />
            }
            title="发现"
            key="discover"
            badge={99}
            selected={this.selectedTab === 'discover'}
            onPress={() => this.handleOnPress('discover')}
          >
            <Discover />
          </TabBar.Item>
          <TabBar.Item
           icon={
            <Popover mask
              overlayClassName={styles.fortest}
              overlayStyle={{ color: 'red'}}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                  <span style={{ marginRight: 5 }}>Help</span>
                </Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }>
          </TabBar.Item>
        </TabBar>
        <MusicFooter />
        </Drawer>
      </div>
    );
  }
}
export default Entry;