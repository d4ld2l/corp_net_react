import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'

import { getNewsCategory } from '../../../redux/actions/newsActions'

const cn = require('bem-cn')('all-news')
if (process.env.BROWSER) {
  require('./all-news.css')
}
moment.locale('ru')
export default class AllNewsTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      news: this.props.news,
    }
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.news, nextProps.news)) {
      this.setState({ news: nextProps.news })
    }
  }

  tagSearch(tag) {
    const { tagSearch } = this.props
    tagSearch(tag)
  }
  render() {
    return (
      <Row>
        <Col xs={12}>
          {this.state.news.map((e, i) => (
            <div className={cn('block-news')} key={i}>
              <Row>
                <Col xs={2}>
                  <time dateTime="2017-08-20">
                    <h3 className={cn('date-number')}>{moment(e.updated_at).format('DD MMM')}</h3>
                    <p className={cn('date-year')}>{moment(e.updated_at).format('YYYY')}</p>
                  </time>
                </Col>
                <Col xs={10}>
                  <article>
                    <header>
                      <Link className={cn('link')} to={`/news/${e.id}`}>
                        <h4 className={cn('article-name')}>{e.title}</h4>
                      </Link>
                      {e.news_category && <p className={cn('dots-name')}>{e.news_category.name}</p>}
                    </header>
                    <main>
                      <p className={cn('article-text')}>{e.preview}</p>
                      <Row>
                        {e.photos.length > 0 &&
                          e.photos.map((photo, idx) => {
                            return (
                              idx < 2 && (
                                <Col xs={6} key={idx}>
                                  <img
                                    src={photo.file.url}
                                    alt={photo.name}
                                    className="img-responsive"
                                  />
                                </Col>
                              )
                            )
                          })}
                      </Row>
                      <Row>
                        <Col xs={12}>
                          {e.tags.map((tag, idx) => (
                            <mark
                              className={cn('article-mark')}
                              key={idx}
                              onClick={() => this.tagSearch(tag.name)}
                            >
                              {tag.name}
                            </mark>
                          ))}
                        </Col>
                      </Row>
                    </main>
                  </article>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    )
  }
}
