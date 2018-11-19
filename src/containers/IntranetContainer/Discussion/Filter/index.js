import React, { Component } from 'react'

import { Pencil, Trash, Exit, FilterThin, AddPeople, Checkbox } from 'components-folder/Icon/index'

import Search from './Search'
import Select from './Select'
import SearchResult from './SearchResult'

const cn = require('bem-cn')('discussion-filter')
if (process.env.BROWSER) {
  require('./style.css')
}

class Filter extends Component {
  render() {
    // Data
    const {
      selectOptions,
      searchCount,
      tabs,
      filter: { show, params },
      select: { showMenu },
    } = this.props

    // Actions
    const { toggleFilters, showCreateForm, changeFilterParam, closeAll } = this.props

    return (
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('func-elem')}>
            {/*<label className={'custom-checkbox'}>
              <input type="checkbox" disabled />
              <span className={'custom-checkmark is-disabled'} title="NOT NOW!!!" />
            </label>*/}
            {showMenu && (
              <div className={cn('menu')}>
                <span className={cn('menu-item')}>
                  <Pencil className={cn('menu-icon')} />
                </span>
                <span className={cn('menu-item')}>
                  <Trash className={cn('menu-icon')} />
                </span>
                <span className={cn('menu-item')}>
                  <Exit className={cn('menu-icon')} />
                </span>
                <span className={cn('menu-item')}>
                  <AddPeople className={cn('menu-icon')} />
                </span>
                <span className={cn('menu-item').mix(cn('menu-item_last'))}>
                  <Checkbox className={cn('menu-icon')} />
                </span>
              </div>
            )}
            <div className={'btn btn-primary btn_padding-8-14'} onClick={showCreateForm}>
              Новое обсуждение
            </div>
          </div>
          <div onClick={toggleFilters}>
            {show ? (
              <span className={cn('header-link')}>
                <a>Свернуть фильтр</a>
              </span>
            ) : (
              <span className={cn('icon-wrapper')} title={'Открыть фильтр'}>
                <FilterThin className={cn('icon')} />
              </span>
            )}
          </div>
        </div>
        {show && (
          <div>
            <div className={cn('body')}>
              <Search {...params} changeFilterParam={changeFilterParam} />
              <Select {...selectOptions} {...params} changeFilterParam={changeFilterParam} />
            </div>
            {/*search-results shown instead search and select */}
            {/* search-results shown instead search and select */}
          </div>
        )}
        {params.q && <SearchResult query={params.q} searchCount={searchCount} />}
      </div>
    )
  }
}
export default Filter
