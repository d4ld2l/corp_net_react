import React, { Component } from 'react'
import { v4 } from 'uuid'

const cn = require('bem-cn')('analytics')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class Funnel extends Component {
  render() {
    const { analytics } = this.props

    return (
      <div className={cn('funnel-wrapper')}>
        <p className={cn('funnel-title').mix('p3 p3_theme_light')}>Кол-во кандидатов</p>
        {analytics.stats &&
          analytics.stats.map(it => (
            <div key={v4()} className={cn('funnel')}>
              <div className={cn('funnel-item-wrapper')}>
                <div className={cn('funnel-item')} style={{ backgroundColor: it.color }}>
                  <p className={cn('funnel-item-text')}>{it.candidates_vortex_count}</p>
                </div>
              </div>
              <p className={cn('funnel-item-title')}>{it.label}</p>
            </div>
          ))}
      </div>
    )
  }
}
