import React, { Component } from 'react'
import { v4 } from 'uuid'

const cn = require('bem-cn')('analytics')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class Graph extends Component {
  render() {
    const { analytics } = this.props
    return (
      <div className={cn('graph-wrapper')}>
        {analytics.stats &&
          analytics.stats.map(it => (
            <div key={v4()} className={cn('graph')}>
              <div className={cn('graph-item-wrapper')}>
                <p className={cn('graph-item-text')}>{it.candidates_vortex_count}</p>
                <div
                  className={cn('graph-item')}
                  style={{
                    backgroundColor: it.color,
                    height: `${Math.round(
                      300 /
                        Math.max.apply(
                          Math,
                          analytics.stats && analytics.stats.map(it => it.candidates_vortex_count)
                        ) * it.candidates_vortex_count
                    )}px`,
                  }}
                />
              </div>
              <p className={cn('graph-item-title')}>{it.label}</p>
            </div>
          ))}
        <div className={cn('graph-horizontal-dashed-middle-line')}>
          <p className={cn('graph-horizontal-dashed-middle-line-text')}>
            {Math.round(
              Math.max.apply(
                Math,
                analytics.stats && analytics.stats.map(it => it.candidates_vortex_count)
              ) / 3
            )}
          </p>
        </div>
        <div className={cn('graph-horizontal-dashed-middle-line')} style={{ bottom: '264px' }}>
          <p className={cn('graph-horizontal-dashed-middle-line-text')}>
            {Math.round(
              Math.max.apply(
                Math,
                analytics.stats && analytics.stats.map(it => it.candidates_vortex_count)
              ) / 3 * 2
            )}
          </p>
        </div>
        <div className={cn('graph-horizontal-dashed-middle-line')} style={{ bottom: '364px' }}>
          <p className={cn('graph-horizontal-dashed-middle-line-text')}>
            {Math.round(
              Math.max.apply(
                Math,
                analytics.stats && analytics.stats.map(it => it.candidates_vortex_count)
              ) / 3 * 3
            )}
          </p>
        </div>
        <div className={cn('graph-vertical-solid-left-line')}>
          <p className={cn('graph-vertical-solid-left-line-text').mix('p3 p3_theme_light')}>Кол-во кандидатов</p>
        </div>
        <div className={cn('graph-horizontal-solid-bottom-line')} />
      </div>
    )
  }
}
