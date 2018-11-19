import React, { Component } from 'react'

export default class MyComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.iframe.addEventListener('load', this.props.onLoad)
  }

  render() {
    return <iframe frameBorder="0" ref="iframe" {...this.props} />
  }
}
