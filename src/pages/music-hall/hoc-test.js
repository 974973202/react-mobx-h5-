import React from 'react';

export default function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '15230238001'
      }

      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      }
      // const newPros1 = {
      //   submit: {

      //   }
      // }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}