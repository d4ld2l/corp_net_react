import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const cn = require('bem-cn')('no-found')
if (process.env.BROWSER) {
  require('./css/no-found/no-found.css')
}

export default class NoFoundContainer extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Страница не найдена - 404</title>
        </Helmet>
        <div className={cn}>
          <div className={cn('star').mix(cn('star_one'))} />
          <div className={cn('star').mix(cn('star_two'))} />
          <div className={cn('star').mix(cn('star_three'))} />
          <div className={cn('ufo').mix('ufo')}>
            <div className={'ufo__ray'} />
          </div>
          <div className={cn('text')}>
            <p className={cn('text_40')}>404</p>
            <p className={cn('text_24')}>Страница не найдена</p>
            <p className={cn('text_13')}>
              Приносим свои извинения! Возможно, страница, которую вы ищете, была удалена, или вы<br />
              ввели неправильный адрес. Пожалуйста, проверьте адрес<br /> и попробуйте еще раз.
            </p>
            <Link className={'btn btn-primary'} to={'/'}>
              На главную
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
