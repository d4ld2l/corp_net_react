import React, { Component } from 'react'
import PropTypes from 'prop-types'

const cn = require('bem-cn')('Footer')

export default class Container extends Component {
  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return <div>Footer</div>
  }
}
