import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'
import Loader from 'components-folder/Loader'

import { Comment, Like } from 'components-folder/Icon'

import {dislike, getNewsCategory, like} from '../../../redux/actions/newsActions'

const cn = require('bem-cn')('all-news')
if (process.env.BROWSER) {
  require('./all-news.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    currentCat: state.news.currentCat,
    news: state.news.data,
    loading: state.loaders.news,
  }),
  { getNewsCategory, dislike, like }
)

class AllNewsTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      news: [],
    }
  }

  componentWillMount() {
    const { news, catId } = this.props
    let ns
    if (catId) {
      ns = news.filter(el => {
        return el.news_category_id === catId
      })
    } else {
      ns = news
    }
    this.setState({ news: ns })
  }

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
    const news = this.state.news
    const { loading, dislike, like } = this.props

    if (loading) {
      return <Loader />
    }

    return (
      <Row>
        <Col xs={12}>
          {news.map((e, i) => (
            <div className={cn('block-news')} key={i}>
              <article>
                <header className={cn('artiсle-header')}>
                  <div>
                    <Link className={cn('link').mix('link_theme_light_first')} to={`/news/${e.id}`}>
                      <h3 className={cn('article-title')}>{e.title}</h3>
                    </Link>
                  </div>
                  <time
                    className={cn('artcile-time-publication').mix('p2 p2_theme_light_second')}
                    dateTime={moment(e.updated_at).format('LT, DD.MM.YYYY')}
                  >
                    {moment(e.updated_at).format('LT, DD.MM.YYYY')}
                  </time>
                  {e.news_category && (
                    <p className={cn('artcile-category-name').mix('p2 p2_theme_light_second')}>{e.news_category.name}</p>
                  )}
                  <div className={cn('wrapper-icon')} title="Мне нравится">
                    {e.already_liked ? (
                            <span onClick={() => dislike(e.id)}>
                      <Like className={cn('like-filled-icon')} />
                      </span>
                    ) : (
                      <span onClick={() => like(e.id)}>
                       <Like status={'outline'} className={cn('like-icon')} />
                       </span>
                    )}
                    <span className={cn('count').mix('p4 p4_theme_light_second')}>{e.likes_count}</span>
                  </div>
                  <Link className={cn('link-comment')} to={`/news/${e.id}#comments`}>
                    <Comment className={cn('artcile-comments-icon')} />
                    <span className={cn('artcile-comments-count').mix('p2 p2_theme_light_second')}>{e.comments_count}</span>
                  </Link>
                </header>
                <section>
                  <p className={cn('article-text').mix('p1 p1_theme_light_first')}>{e.preview}</p>
                  <Row>
                    {e.photos.length > 0 &&
                      e.photos.map((photo, idx) => {
                        return (
                          idx < 2 && (
                            <Col xs={6} key={idx}>
                              <img
                                src={photo.file.url}
                                alt={photo.name}
                                className={cn('artcile-preview-img').mix('img-responsive')}
                              />
                            </Col>
                          )
                        )
                      })}
                  </Row>
                </section>
                <footer className={cn('article-footer')}>
                  {e.tags.map((tag, idx) => (
                    <mark
                      className={cn('article-mark').mix('p2 p2_theme_light_second')}
                      key={idx}
                      onClick={() => this.tagSearch(tag.name)}
                      tabIndex={'0'}
                    >
                      #{tag.name}
                    </mark>
                  ))}
                </footer>
              </article>
            </div>
          ))}
        </Col>
      </Row>
    )
  }
}

export default connector(AllNewsTab)
