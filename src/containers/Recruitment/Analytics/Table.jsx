import React, { Component } from 'react'
import { v4 } from 'uuid'

const cn = require('bem-cn')('analytics')

if (process.env.BROWSER) {
  require('./style.css')
}

export default class Table extends Component {
  render() {
    const { analytics } = this.props

    return (
      <table className={cn('table')}>
        <thead className={cn('table-thead')}>
          <tr className={cn('table-thead-tr')}>
            <th className={cn('table-th')}>
              <p className={'p3 p3_theme_light indent_reset'}>Группа этапов</p>
            </th>
            <th className={cn('table-th')}>
              <p className={'p3 p3_theme_light indent_reset'}>кол-во кандидатов</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {analytics.stats &&
            analytics.stats.map(it => (
              <tr className={cn('table-tr')} key={v4()}>
                <td className={cn('table-td')}>
                  <p className={cn('table-td-text')}>{it.label}</p>
                </td>
                <td className={cn('table-td')}>
                  <p className={cn('table-td-text')}>{it.candidates_vortex_count}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }
}
