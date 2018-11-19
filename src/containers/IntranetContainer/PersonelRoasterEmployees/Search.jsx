import React, { Component } from 'react'
import { Loupe } from 'components-folder/Icon'
import { setSearch } from "../../../redux/actions/projectsDataActions";


const cn = require('bem-cn')('search-b')
if (process.env.BROWSER) {
  require('./css/search/search.css')
}

export default class Search extends Component {

  onSubmit(){
    const { dispatch, activeTabMy } = this.props
    dispatch(setSearch(this.refs.searchInput.value, activeTabMy))
  }

  render() {
    const { searchParams } = this.props

    return (
      <div className={'search-b'}>
        <div className={'search-b-wrapper-input'}>
          <input ref="searchInput" type="text" className={'search-b-input'}
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
