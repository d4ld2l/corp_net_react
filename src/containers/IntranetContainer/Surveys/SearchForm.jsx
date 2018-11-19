import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import { connect } from 'react-redux'
import { Loupe, Close } from 'components-folder/Icon'

const cn = require('bem-cn')('search-form-survey')
if (process.env.BROWSER) {
  require('./search-form.css')
}

const connector = connect()

class SearchForm extends Component {
  state = {
    searchValue: '',
  }

  componentWillUnmount() {
    this.handleReset()
  }

  handleReset = async () => {
    await this.props.resetSearch()
    this.setState({ searchValue: '' })
  }

  async handleSearch() {
    const { searchSurveys, scope } = this.props
    const { searchValue } = this.state
    if (searchValue.length) {
      await searchSurveys(searchValue, scope)
    }
  }

  keyDown = ({ key }) => {
    if (key === 'Enter') {
      this.handleSearch()
    }
  }

  handleChange = ({ target: { value } }) => {
    let sanitizedValue = value.trimLeft().replace(/\s+/g, ' ')

    this.setState({ searchValue: sanitizedValue })

    if (!sanitizedValue.length) {
      this.props.resetSearch()
    }
  }

  render() {
    const { searchValue } = this.state
    return (
      <div className={cn('search-form')}>
        <div className={cn('search-field-container')}>
          <div className={cn('c-search')}>
            <DebounceInput
              className={cn('surveys-search')}
              debounceTimeout={100}
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
              value={searchValue}
              forceNotifyByEnter={false}
            />
            <Loupe className={cn('icon-loup')} />
            {searchValue.length > 0 && (
              <span onClick={this.handleReset}>
                <Close fat className={cn('icon-closed').mix('cur')} />
              </span>
            )}
          </div>
          <div className={cn('btn-padding')}>
            <button className={'btn btn-primary'} onClick={() => this.handleSearch()}>
              Найти
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default connector(SearchForm)
