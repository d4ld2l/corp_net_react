import React, { Component } from 'react'

import { Loupe, Close } from 'components-folder/Icon'

export const cn = require('bem-cn')('discussion-search')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: '',
    }

    this.handlerSubmitSearch = this.handlerSubmitSearch.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  handlerSubmitSearch() {
    const { changeFilterParam, q } = this.props
    const { searchInput } = this.state
    if (q || searchInput !== '')
      changeFilterParam({
        q: searchInput === '' ? undefined : searchInput,
      })
  }

  clearSearch() {
    this.setState({ searchInput: '' }, this.handlerSubmitSearch)
  }

  render() {
    const { showCard, showEdit, showMembers, q } = this.props
    return (
      <div className={cn}>
        <div
          className={cn('wrapper-input').mix(
            (showCard || showEdit || showMembers) && cn('wrapper-input_active')
          )}
        >
          <input
            type="text"
            className={cn('input')}
            value={this.state.searchInput}
            onChange={evt => {
              this.setState({
                searchInput: evt.target.value,
              })
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                this.handlerSubmitSearch.call(this)
              }
            }}
          />
          {this.state.searchInput !== '' && (
            <div onClick={this.clearSearch} className={cn('clear')}>
              <Close />
            </div>
          )}
          <Loupe className={cn('icon')} />
        </div>
        <div className={'btn btn-primary'} onClick={this.handlerSubmitSearch}>
          найти
        </div>
      </div>
    )
  }
}
