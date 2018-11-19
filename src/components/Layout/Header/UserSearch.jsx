import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'

import { Loupe } from '../../Icon'

const cn = require('bem-cn')('user-search')

if (process.env.BROWSER) {
  require('./UserSearch.css')
}

class UserSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openInputSearch: false,
    }
  }

  handleClickOutside = () => {
    this.handkerCloseInputSearch()
  }

  handkerOpenInputSearch = () => {
    this.setState({ openInputSearch: true })
  }

  handkerCloseInputSearch = () => {
    this.setState({ openInputSearch: false })
  }

  render() {
    const { openInputSearch } = this.state

    return (
      <div className={cn}>
        <div
          className={cn('icons')
            .mix('cur')
            .state({ open: openInputSearch })}
          onClick={() => {
            if (openInputSearch) {
              this.handkerCloseInputSearch()
            } else {
              this.handkerOpenInputSearch()
            }
          }}
        >
          <div className={cn('icon-wrap')}>
            <Loupe className={cn('icon')} />
          </div>
        </div>

        {openInputSearch && (
          <div className={cn('menu')}>
            <form>
              <Loupe className={cn('icon-search')} />
              <input type="text" className={cn('input-search')} placeholder="Введите запрос" />
              <button type="reset" className={cn('btn-reset')} />
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default onClickOutside(UserSearch)
