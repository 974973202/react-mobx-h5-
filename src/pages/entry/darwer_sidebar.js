import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { List, Switch } from 'antd-mobile';
import styles from './index.less';

@observer
class DarwerSidebar extends Component {
  @observable checked = false;

  render () {
    const { drawerArr } = this.props;
    const { darwer_l, darwer_z, darwer_x } = drawerArr;

    return (
      <Fragment>
        <div className={styles.drawerList}>
          <List >
            {
              darwer_l && 
                darwer_l.map( e => 
                  <List.Item 
                    key={e.title} 
                    extra={`${e.extra}`}
                  >
                    {e.title}
                  </List.Item>
                )
            }
            {
              darwer_z && 
                darwer_z.map( e => 
                  <List.Item 
                    key={e.title} 
                    extra={
                      <Switch
                        // checked={e.extra}
                        checked={this.checked}
                        onChange={(e) => {
                          this.checked = e
                        }}
                      />
                    }
                  >
                    {e.title}
                  </List.Item>
                )
            }
            {
              darwer_x && 
                darwer_x.map( e => 
                  <List.Item 
                    key={e.title} 
                    extra={`${e.extra}`}
                  >
                    {e.title}
                  </List.Item>
                )
            }
          </List>
        </div>
        <div className={styles.drawerFooter}>
          <p>设置</p>
          <p>退出登陆/关闭</p>
        </div>
      </Fragment>
    )
  }
}

export default DarwerSidebar;