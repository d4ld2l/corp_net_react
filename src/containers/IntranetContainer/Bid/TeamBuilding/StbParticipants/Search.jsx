import React, { Component } from 'react'
import { Loupe } from 'components-folder/Icon'
import { setSearchStbParticipants } from "../../../../../redux/actions/bidsActions";

const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('../../../Project/style.css')
}

export default class Search extends Component {

  onSubmit(){
    const { dispatch, bid } = this.props
    dispatch(setSearchStbParticipants(bid.id, this.refs.searchInput.value))
  }

  render() {
    return (
      <div className={cn('search-b')} style={{padding: '10px 20px 20px 20px'}}>
        <div className={cn('search-b-wrapper-input')}>
          <input ref="searchInput" type="text" className={cn('search-b-input')}
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
