import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'
import { Loupe, Arrow } from '../../Icon'
import { updateSearchState, toggleAdvancedSearch } from '../../../redux/actions/candidatesActions'

const cn = require('bem-cn')('candidates-search-form')
if (process.env.BROWSER) {
  require('./candidates-search-form.css')
}


const connector = connect(state => ({
  search: state.candidates.search
}))


class SearchForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const { handleSearch, search: { query } } = this.props
    this.props.closeSidebar()
    query.length > 0 && handleSearch()
  }

  handleChange = ({ target: { value } }) => {
    const query = value
    const { dispatch, resetSearch } = this.props
    query.length ? dispatch(updateSearchState({ query })) : resetSearch()
  }

  toggleAdvancedSearch = () => {
    this.props.dispatch(toggleAdvancedSearch())
  }

  render() {
    const { search: { showAdvanced, query, now } } = this.props

    return (
      <form className={cn} onSubmit={this.handleSubmit}>
        <div className={cn('search-block')}>
          <div className={cn('search-field')}>
            <DebounceInput
              // minLength={1}
              className={cn('input-search')}
              debounceTimeout={300}
              value={query}
              onChange={this.handleChange}
            />
            <Loupe className={cn('icon-magnify')} />
          </div>
          <button
            type="submit"
            className={cn('search-btn').mix('btn btn-primary')}>
            Найти
          </button>
        </div>
        <div className={cn('label-block')}>
          <h3 className={cn('label').mix('indent_reset')}>Подобрать</h3>
          <span className={cn('advanced-search-btn').mix('p2 link link_theme_light_third link_pseudo')} onClick={this.toggleAdvancedSearch}>
            {showAdvanced ? (
              <span>
                <Arrow className={cn('label-arrow')} />К этапам
              </span>
            ) : (
              'Расширенный поиск'
            )}
          </span>
        </div>
      </form>
    )
  }
}

export default connector(SearchForm)
