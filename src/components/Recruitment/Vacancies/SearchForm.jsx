import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { Loupe } from '../../Icon'

const cn = require('bem-cn')('search-form-in-work')
if (process.env.BROWSER) {
  require('./Container.css')
}

export default class SearchForm extends Component {
  render() {
    return (
      <div className={cn('search-form')}>
        <div className={cn('c-search')}>
          <DebounceInput
            minLength={2}
            className={cn('search')}
            debounceTimeout={300}
            forceNotifyByEnter={false}
          />
          <Loupe className={cn('icon-loup')} />
        </div>
        <div className={cn('btn-padding')}>
          <button className={'btn btn-primary'}>Найти</button>
        </div>
      </div>
    )
  }
}
