import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { Loupe } from 'components-folder/Icon'

const cn = require('bem-cn')('vacancy-candidates-search-form')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesSearchForm.css')
}

export default class CandidatesSearchForm extends Component {
  render() {
    return (
      <div className={cn}>
        <div className={cn('c-search')}>
          <DebounceInput
            className={cn('input-search')}
            debounceTimeout={1000}
            onChange={event => {
              this.props.handlerSearch(event.target.value)
            }}
          />
          <Loupe className={cn('icon-magnify')} />
        </div>
      </div>
    )
  }
}
