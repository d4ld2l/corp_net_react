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
    categories: state.news.categories,
  }),
  { getTagNews }
)

class NewsTabs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: 0,
      display: true,
      tagNews: [],
    }
  }

  handleSelect(key) {
    this.setState({
      key,
      display: key !== -1,
    })
  }

  tagSearch(tag) {
    const { getTagNews } = this.props
    getTagNews([tag]).then(data => {})
  }

  render() {
    const { categories, tagNews } = this.props
    return (
      <Row>
        <Col xs={9}>
          <Tabs
            className={cn('list')}
            activeKey={this.state.key}
            onSelect={key => this.handleSelect(key)}
            id="tabs"
          >
            <Tab key={0} title="Все новости" eventKey={0}>
              <AllNewsTab tagSearch={this.tagSearch.bind(this)} />
            </Tab>
            {categories &&
              categories.map((cat, idx) => (
                <Tab key={idx + 1} eventKey={idx + 1} title={cat.name}>
                  <AllNewsTab catId={cat.id} tagSearch={this.tagSearch.bind(this)} />
                </Tab>
              ))}
          </Tabs>
        </Col>
        <Row>
          <Col xs={3}>
            <NewsSearchForm />
          </Col>
        </Row>
      </Row>
    )
  }
}

export default connector(NewsTabs)
