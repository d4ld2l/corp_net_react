import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'

import { Loupe } from 'components-folder/Icon/'

const cn = require('bem-cn')('search-form-in-work')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class SearchForm extends Component {
  render() {
    return (
      <div className={cn('search-form')}>
        <div className="row">
          <div className={cn('c-search').mix('col-xs-10')}>
            <DebounceInput
              minLength={2}
              className={cn('surveys-search')}
              debounceTimeout={300}
              forceNotifyByEnter={false}
            />
            <Loupe className={cn('icon-loup')} />
          </div>
          <div className={cn('btn-padding').mix('col-xs-2')}>
            <button className={'btn btn-primary'}>Найти</button>
          </div>
        </div>
      </div>
    )
  }
}
