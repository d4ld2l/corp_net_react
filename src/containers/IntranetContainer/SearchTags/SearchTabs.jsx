import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab, Tabs, Row, Col } from 'react-bootstrap'

import AllNewsTab from './AllNewsTab'
import NewsSearchForm from './NewsSearchForm'
import { getTagNews } from '../../../redux/actions/newsActions'

const cn = require('bem-cn')('news-tabs')
if (process.env.BROWSER) {
  require('./news-tabs.css')
}

const connector = connect(
  state => ({
    tagNews: state.news.tagNews,
  }),
  { getTagNews }
)

class SearchTabs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tagNews: this.props.tagNews,
    }
  }

  tagSearch(tag) {
    const { getTagNews } = this.props
    getTagNews([tag]).then(data => {
      this.setState({ tagNews: data })
    })
  }

  render() {
    const { tagNews } = this.props
    return (
      <Row>
        <Col xs={9}>
          <Tabs className={cn('list')} defaultKey={0} id="tabs">
            <Tab key={-1} title="Поиск по тегу" eventKey={0}>
              <AllNewsTab tagNews={this.state.tagNews} tagSearch={this.tagSearch.bind(this)} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

export default connector(SearchTabs)
