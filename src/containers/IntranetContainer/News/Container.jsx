import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import  Breadcrumbs  from 'components-folder/Breadcrumbs/'

import NewsTabs from './NewsTabs'

import pick from 'ramda/src/pick'

import Loader from 'components-folder/Loader'
import type { LoadersState } from '../../../types/states'
import { getNews, getNewsCategories } from 'redux-folder/actions/newsActions'

const cn = require('bem-cn')('intranet-news')
if (process.env.BROWSER) {
  require('./Container.css')
}

type Props = {
  loaders: LoadersState,
}

const connector = connect(pick(['loaders', 'news', 'system']))

class Container extends Component<Props> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getNews())
    dispatch(getNewsCategories())
    window.scrollTo(0, 0)
  }

  render() {
    const breadcrumbs = [{name: 'Новости', location: '/'}]
    if (this.props.loaders.news) {
      return <Loader />
    }
    const { system: { menu } } = this.props

    return (
      <div className={cn.mix('container')}>
        <Row>
          <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
            <Breadcrumbs />
            <h1>{menu.find(it => it.id === 'shr_news').label}</h1>
          </Col>
        </Row>
        <NewsTabs />
      </div>
    )
  }
}
export default connector(Container)
