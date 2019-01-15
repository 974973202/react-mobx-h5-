import React, { StrictMode } from 'react';
/**
 * StrictMode 目前有助于：
    识别具有不安全生命周期的组件
    关于遗留字符串ref API使用的警告
    关于已弃用的findDOMNode用法的警告
    检测意外的副作用
    检测遗留上下文API
 */

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={require('./assets/timg.jpg')} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }
  
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* ...but how do we render something other than a <p>? */}
        {/* <p>The current mouse position is ({this.state.x}, {this.state.y})</p> */}
        {/* <Cat mouse={this.state} /> */}
        {
          this.props.render(this.state)
        }
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <StrictMode>
        <h1>Move the mouse around!</h1>
        <MouseWithCat render={
          mouse => (
            <Cat mouse={mouse} />
          )
        }/>
      </StrictMode>
    );
  }
}

// function withMouse(Component) {
//   return class extends React.Component {
//     render() {
//       return (
//         <MouseWithCat render={mouse => (
//           <Component {...this.props} mouse={mouse} />
//         )}/>
//       );
//     }
//   }
// }
export default MouseTracker;