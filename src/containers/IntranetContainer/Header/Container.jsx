import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('intranet-header')

if (process.env.BROWSER) {
  require('./Container.css')
}
export default class Container extends Component {
  render() {

    return (
      <div className={cn}>
        <div className={cn('container').mix('container')}>
          <Link className={cn('intranet-link')} to="/">
            Интранет
          </Link>
          <a className={cn('intranet-link')} href="http://lk.krsk2019.ru/suz/documents" target="_blank" rel="noopener noreferrer">
            Адаптация
          </a>
          <a className={cn('intranet-link')} href="http://lk.krsk2019.ru/suz/training_plans" target="_blank" rel="noopener noreferrer">
            Обучение
          </a>
        </div>
      </div>
    )
  }
}
