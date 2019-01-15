import React, { Component, Fragment, Suspense } from 'react';
import { Button } from 'antd-mobile';
import { ThemeContext as bg } from './context';
import classNames from 'classnames';
import logo from './logo.svg';
import styles from './App.less';

const TodoHooks = React.lazy(() => import('./Todo-hooks'));
const ThemeContext = React.createContext('light');
const UserContext = React.createContext({
  name: 'Guest',
});



class Theme extends Component {
  render () {
    return (
      <ThemeContext.Provider value='1'>
        <UserContext.Provider value='2'>
          <Appp></Appp>
        </UserContext.Provider>
      </ThemeContext.Provider> 
    )
  }
}

class Appp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
    };
  }

  componentDidMount() {
    console.dir(this.el)
  }

  // componentDidUpdate(prevProps, prevState, snaphot) {
  //   console.log(prevProps)
  //   console.log(prevState)
  // }

  // static contextType = ThemeContext; // 1
  static contextType = bg

  handleClick = () => {
    // const { sum } = this.state
    this.setState((state, props) => {
      return {
        sum: state.sum + 1
      }
    }, () => {
      console.log(this.state)
    })
  }

  render() {
    const { sum } = this.state;
    let theme = this.context;
    
    // console.log(theme) // dark
    // console.log(Appp.contextType)
    const pClass = classNames(styles.test, {
      [styles.test1]: false,
    })
    return (
      <Fragment>
        <Button 
          onClick={this.handleClick}
          ref={e => this.el = e}
        >
        onClick
        </Button>
        <p
          // style={{background: theme.background}}  
          className={pClass}        
        >{sum}</p>
        <Suspense fallback={<div>loading...</div>}>
          <TodoHooks />
        </Suspense>
        <ThemeContext.Consumer>
          {
            a => {
              console.log(a)
              return (
                <UserContext.Consumer>
                  {
                    b => console.log(b)
                  }
                </UserContext.Consumer>
              )
            }
          }
        </ThemeContext.Consumer>
      </Fragment>
    );
  }
}
// Appp.contextType = ThemeContext; // 2
// Appp.contextType = bg;

export default Theme;