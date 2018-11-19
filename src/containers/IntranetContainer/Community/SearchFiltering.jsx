import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loupe, Close } from 'components-folder/Icon'
import SearchForm from './SearchForm'
import { getPosts, getAllPosts, resetSearch, setSearchOpen } from '../../../redux/actions/feedsActions'

const cn = require('bem-cn')('search-filtering')

if (process.env.BROWSER) {
  require('./Container.css')
}

const connector = connect(state => ({
  openSearch: state.feed.openSearch,
}))

class SearchFiltering extends Component {
  state = {
    active: 'all',
  }
  closeSearchForm() {
    const { dispatch, openSearch } = this.props
    dispatch(setSearchOpen(!openSearch))
    dispatch(resetSearch())
  }
  changeFilter(active) {
    const { dispatch } = this.props
    if (active === 'all') {
      dispatch(getAllPosts())
    } else {
      dispatch(getPosts(active))
    }
    dispatch(resetSearch())
    this.setState({ active })
  }
  render() {
    const { active } = this.state
    const { openSearch, dispatch } = this.props

    return (
      <div className={cn()}>
        {openSearch && <SearchForm />}
        <section className={cn('wrapper-functional-element')}>
          <section className={cn('wrapper-filter')}>
            <div className={cn('filter-tab').state({ active: active === 'all' })}>
              <span
                className={cn('filter-text').mix('cur')}
                onClick={() => this.changeFilter('all')}
              >
                Все
              </span>
            </div>
            <div className={cn('filter-tab').state({ active: active === 'popular' })}>
              <span
                className={cn('filter-text').mix('cur')}
                onClick={() => this.changeFilter('popular')}
              >
                Популярные
              </span>
            </div>
            <div className={cn('filter-tab').state({ active: active === 'favorite' })}>
              <span
                className={cn('filter-text').mix('cur')}
                onClick={() => this.changeFilter('favorite')}
              >
                Избранное
              </span>
            </div>
            <div className={cn('filter-tab').state({ active: active === 'my' })}>
              <span
                className={cn('filter-text').mix('cur')}
                onClick={() => this.changeFilter('my')}
              >
                Мои посты
              </span>
            </div>
            <div className={cn('filter-tab').state({ active: active === 'by_communities' })}>
              <span
                className={cn('filter-text').mix('cur')}
                onClick={() => this.changeFilter('by_communities')}
              >
                Группы
              </span>
            </div>
          </section>
          {openSearch ? (
            <div
              className={cn('pseudo-input').state({ open: openSearch })}
              onClick={() => this.closeSearchForm()}
              title="Закрыть поиск"
            >
              <Close fat className={cn('cloused-icon')} />
            </div>
          ) : (
            <div
              className={cn('pseudo-input').state({ open: openSearch })}
              onClick={() => dispatch(setSearchOpen(!openSearch))}
              title="Открыть поиск"
            >
              <Loupe className={cn('loupe-icon')} />
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default connector(SearchFiltering)
