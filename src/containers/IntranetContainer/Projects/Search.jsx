import React, { Component } from 'react'
import { Loupe } from 'components-folder/Icon'
import { setSearch } from "../../../redux/actions/projectsDataActions";


const cn = require('bem-cn')('projects')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Search extends Component {

  onSubmit(){
    const { dispatch, activeTabMy } = this.props
    dispatch(setSearch(this.refs.searchInput.value, activeTabMy))
  }

  render() {
    const { searchParams } = this.props

    return (
      <div className={cn('search-b')}>
        <div className={cn('search-b-wrapper-input')}>
          <input ref="searchInput" type="text" className={cn('search-b-input')}
                 defaultValue={searchParams}
                 onKeyDown={(e) => e.key === 'Enter' && this.onSubmit()}
                 onChange={(e) => e.target.value === '' && this.onSubmit()}
          />
          <Loupe className={cn('icon-loupe')} />
        </div>
        <button className={'btn btn-primary'} onClick={() => this.onSubmit()}>Найти</button>
      </div>
    )
  }
}
