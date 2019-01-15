import React, { Component, Fragment } from 'react';
import ppHOC from './hoc-test';

@ppHOC
class MusicHall extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <input name="name" {...this.props.name}/>
        <button>submit</button>
        {this.props.name.value}
      </Fragment>
    )
  }
}
export default MusicHall;