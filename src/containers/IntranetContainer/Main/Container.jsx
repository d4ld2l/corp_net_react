import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import pick from 'ramda/src/pick'
import Sidebar from '../Sidebar'
import { Row, Col } from 'react-bootstrap'
import { Comment, Like, About } from 'components-folder/Icon'
import Loader from 'components-folder/Loader'
import type { LoadersState } from '../../../types/states'
import { getNews, getGroupNews, getNewsCategories, getTagNews, like, dislike } from 'redux-folder/actions/newsActions'
import { getBirthdaysCurrent } from 'redux-folder/actions/birthdaysActions'


const cn = require('bem-cn')('intranet-main')
if (process.env.BROWSER) {
  require('./Container.css')
}
moment.locale('ru')

type Props = {
  loaders: LoadersState,
}
const connector = connect(pick(['loaders', 'news']),
  { dislike, like })

class Container extends Component<Props> {

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getNews())
    dispatch(getBirthdaysCurrent())
  }

  tagSearch(tag) {
    const { dispatch } = this.props
    dispatch(getTagNews([tag])).then(() => {
      dispatch(push('/news'))
    })
  }

  render() {
    if (this.props.loaders.news) {
      return <Loader />
    }
    const news = this.props.news.data
    const { dislike, like } = this.props

    return (
      <div className={cn('content').mix('container')}>
        <div className={cn('row').mix('row')}>
          <div className={'col-lg-7 col-lg-offset-1 col-md-7 col-md-offset-1 col-sm-8'}>
            <div className={cn}>
              {
                window.dcss.getVariable('main_page_picture_url') &&
                  (
                    <div className={cn('cover')}>
                      <img
                        src={window.dcss.getVariable('main_page_picture_url')}
                        alt="cover"
                        style={{
                          width: '100%',
                        }}
                        className={cn('cover-image').mix('img-responsive')}
                      />
                    </div>
                  )
              }
              <h2 className={cn('title')}>
                Последние новости <About className={cn('icon-news')} />
              </h2>

              <div className={cn('list')}>
                {news.slice(0, 5).map((e, i) => (
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
                          <span className={cn('artcile-comments-count').mix('p4 p4_theme_light_second')}>{e.comments_count}</span>
                        </Link>
                        {/*<Comment className={cn('artcile-comments-icon')} />*/}
                        {/*<span className={cn('artcile-comments-count')}>{e.comments_count}</span>*/}
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
                            className={cn('article-mark').mix('p2 link link_theme_light_second')}
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
              </div>
              <div className={cn('all')}>
                <Link to="/news" className={'link link_theme_light_third'}>все новости</Link>
              </div>
            </div>
          </div>

          <div className={cn('col-xs-4').mix('col-lg-4 col-md-4 col-sm-4')}>
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}
export default connector(Container)
