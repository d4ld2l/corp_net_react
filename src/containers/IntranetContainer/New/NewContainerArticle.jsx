import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

const cn = require('bem-cn')('new-container-article')
if (process.env.BROWSER) {
  require('./new-container-article.css')
}

export default class NewContainerArticle extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { current } = this.props

    return <div className={cn} dangerouslySetInnerHTML={{ __html: current.body }} />
  }
}
