import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Breadcrumbs from 'components-folder/Breadcrumbs/'

import { cn } from './common'

export default class Header extends Component {
  render(){
    const { candidates: { current } } = this.props
    return (
      <div>
        <Helmet key="comparisonHelmet">
          <title>Сравнение кандидатов</title>
        </Helmet>
        <Breadcrumbs
          breadcrumbs={[
            { name: 'Сравнение кандидатов', active: true }
          ]}
        />
        <div className={cn('head')} key="comparisonHeader">
          <h1 className={cn('head-title')}>Сравнение кандидатов</h1>
          <Link className="btn btn-primary" to="/recruitment/candidates">
            Отложить
          </Link>
        </div>
        <p className={cn('head-subtitle')} key="comparisonSubtitle">
          По указанным контактам в базе обнаружено совпадение по{' '}
          {current.similar_candidates.length} кандидатам.
        </p>
      </div>
    )
  }
}
