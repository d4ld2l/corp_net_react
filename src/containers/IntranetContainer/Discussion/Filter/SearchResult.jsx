import React, { Component } from 'react'
import { Close } from 'components-folder/Icon/index'

import { cn } from './Search'

if (process.env.BROWSER) {
  require('./Search/style.css')
}

export default class SearchResult extends Component {
  render() {
    const { searchCount } = this.props
    return (
      <div className={cn('result')}>
        {/*<div className={cn('result-wrapper')}>*/}
        {/*<div className={cn('result-text')}>*/}
        {/*Результат поиска: {this.props.query}*/}
        {/*<span className={cn('result-icon-wrap')}>*/}
        {/*<Close fat className={cn('result-icon')} />*/}
        {/*</span>*/}
        {/*</div>*/}
        {/*</div>*/}
        <div className={cn('result-found')}>
          <p>Найдено: {searchCount}</p>
        </div>
      </div>
    )
  }
}
