import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const connector = connect(state => ({ state }))

class AnalyticsContainer extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>HR - Аналитика</title>
        </Helmet>
        AnalyticsContainer
      </div>
    )
  }
}

export default connector(AnalyticsContainer)
