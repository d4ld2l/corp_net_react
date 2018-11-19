import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Women } from 'components-folder/Icon'

const cn = require('bem-cn')('news-category')
if (process.env.BROWSER) {
  require('./news-category.css')
}

export default class NewsCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { current, news, enabledComponents } = this.props
    const categoryNews = news.filter(e => current.news_category_id === e.news_category_id)
    const image = {
      width: '100%',
      display: 'block',
      height: '260px',
      background: `url('http://placehold.it/370x260') center center / cover no-repeat`,
      marginBottom: '20px',
      marginTop: '20px',
    }

    return (
      <div>
        <div className={cn}>
          <h2>Новости категории</h2>
          <p className={cn('category-name').mix('p2 p2_theme_light_third indent_10')}>
            {current.news_category && current.news_category.name}
          </p>
          {categoryNews.map((e, i) => (
            <article className={cn('artcile-preview')} key={i}>
                  <h4 className={cn('article-name')}>
                    <Link className={'link_theme_light_first'} to={`/news/${e.id}`}>
                      {e.title}
                    </Link>
                  </h4>
              <time
                className={cn('artcile-time-publication').mix('p2 p2_theme_light_second')}
                dateTime={moment(e.updated_at).format('DD.MM.YYYY, LT')}
              >
                {moment(e.updated_at).format('DD.MM.YYYY, LT')}
              </time>
              {e.tags.map((tag, idx) => (
                <mark className={cn('article-mark').mix('p2 p2_theme_light_second')} key={idx}>
                  {tag.name}
                </mark>
              ))}
            </article>
          ))}
        </div>
      </div>
    )
  }
}
