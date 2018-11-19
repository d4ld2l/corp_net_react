import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, Row, Col, Nav, NavItem } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'

import AllNewsTab from './AllNewsTab'
import SearchNewsTab from './SearchNewsTab'
import NewsSearchForm from './NewsSearchForm'
import { getTagNews, resetTags } from '../../../redux/actions/newsActions'

const cn = require('bem-cn')('news-tabs')
if (process.env.BROWSER) {
  require('./news-tabs.css')
}

const connector = connect(state => ({
  categories: state.news.categories,
  tagNews: state.news.tagNews,
  tags: state.news.tags,
}))

class NewsTabs extends Component {
  state = {
    key: 0,
    tagNews: this.props.tagNews,
    tags: this.props.tags,
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.tagNews, nextProps.tagNews)) {
      this.setState({ tagNews: nextProps.tagNews, tags: nextProps.tags })
    }
  }

  tagSearch(tags) {
    const { dispatch } = this.props
    dispatch(getTagNews(tags))
  }

  resetTags() {
    const { dispatch } = this.props
    dispatch(resetTags()).then(() => {
      this.setState({ tags: [], tagNews: [] })
    })
  }

  render() {
    const { categories } = this.props
    const { tagNews, tags } = this.state
    return (
      <Row>
        <Col lg={7} lgOffset={1} md={7} mdOffset={1} sm={8} xs={8}>
          {tagNews && tagNews.length > 0 ? (
            <Tabs className={cn('list')} activeKey={0} onSelect={() => {}} id="tabs">
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey={0}>
                      {tags.join(', ')}
                      <button
                        className="btn btn-link"
                        aria-label="Close"
                        onClick={() => this.resetTags()}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey={0}>
                      <SearchNewsTab tagSearch={tag => this.tagSearch([tag])} news={tagNews} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tabs>
          ) : (
            <Tabs className={cn('list')} defaultActiveKey={0} id="tabs">
              <Tab key={0} title="Все новости" eventKey={0}>
                <AllNewsTab tagSearch={tag => this.tagSearch([tag])} />
              </Tab>
              {categories &&
                categories.map((cat, idx) => (
                  <Tab key={idx + 1} eventKey={idx + 1} title={cat.name}>
                    <AllNewsTab catId={cat.id} tagSearch={tag => this.tagSearch([tag])} />
                  </Tab>
                ))}
            </Tabs>
          )}
        </Col>
        <Row>
          <Col xs={4}>
            <NewsSearchForm tagSearch={tags => this.tagSearch(tags)} />
          </Col>
        </Row>
      </Row>
    )
  }
}

export default connector(NewsTabs)
