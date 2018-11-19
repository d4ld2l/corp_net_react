import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import Breadcrumbs from 'components-folder/Breadcrumbs/'
import NewBlock from './NewBlock'
import NewsCategory from './NewsCategory'
import { dislike, getCurrentNew, like } from '../../../redux/actions/newsActions'
import { Like, Comment } from 'components-folder/Icon'
import Loader from 'components-folder/Loader'
import ReactDOM from 'react-dom'
import scrollToComponent from 'components-folder/ScrollToComponent'

const cn = require('bem-cn')('intranet-news')
if (process.env.BROWSER) {
  require('./Container.css')
}
moment.locale('ru')

const connector = connect(
  state => ({ current: state.news.current, news: state.news.data, loading: state.loaders.new,
    enabledComponents: state.system.enabledComponents }),
  {
    getCurrentNew,
  }
)

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { getCurrentNew, match } = this.props
    Promise.all([getCurrentNew(match.params.id)]).then(() => {
      if (
        window.location.href.split('#').length > 1 &&
        window.location.href.split('#')[1] === 'comments'
      ) {
        scrollToComponent(
          ReactDOM.findDOMNode(this).getElementsByClassName('intranet-news__comments-wrapper')[0],
          { offset: -108, duration: 1000 }
        )
      } else {
        window.scrollTo(0, 0)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { getCurrentNew, match } = this.props
    if (nextProps.match.params.id !== match.params.id) {
      getCurrentNew(nextProps.match.params.id)
    }
  }

  render() {
    const { current, news, loading, user, dispatch, enabledComponents } = this.props

    if (loading || !current || !user) {
      return <Loader />
    }
    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs breadcrumbs={[{ name: current.title, active: true }]} />
            <h1 className={'indent_10'}>{current.title}</h1>

            <time
              className={cn('artcile-time-publication')}
              dateTime={moment(current.updated_at).format('LT, DD.MM.YYYY')}
            >
              {moment(current.updated_at).format('LT, DD.MM.YYYY')}
            </time>
            {current.news_category && (
              <p className={cn('artcile-category-name')}>{current.news_category.name}</p>
            )}
            <div className={cn('wrapper-icon').mix(cn('header-new-like'))} title="Мне нравится">
              {current.already_liked ? (
                <span onClick={() => dispatch(dislike(current.id))}>
                  <Like className={cn('like-filled-icon')} />
                </span>
              ) : (
                <span onClick={() => dispatch(like(current.id))}>
                  <Like status={'outline'} className={cn('like-icon')} />
                </span>
              )}
              <span className={cn('count')}>{current.likes_count}</span>
            </div>
            <Comment className={cn('artcile-comments-icon')} />
            <span className={cn('artcile-comments-count')}>{current.comments_count}</span>
          </Col>
        </Row>
        <Row>
          <Col lg={7} lgOffset={1} md={7} mdOffset={1} sm={8} xs={8}>
            <NewBlock current={current} {...this.props} />
          </Col>
          <Col xs={4}>
            <NewsCategory current={current} news={news} enabledComponents={enabledComponents} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connector(Container)
