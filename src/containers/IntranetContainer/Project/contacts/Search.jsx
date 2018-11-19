import React, { Component } from 'react'
import { Loupe } from 'components-folder/Icon/'
import { searchCustomerContacts } from '../../../../redux/actions/customerContactsActions'

const cn = require('bem-cn')('customers')

class Search extends Component {
  state = {
    query: ''
  }

  handleChange = (event) => {
    const value = event.target.value

    !value && this.props.showResults(false)

    this.setState({ query: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { query } = this.state
    const { dispatch, customerId, showResults } = this.props

    await dispatch(searchCustomerContacts(customerId, query))
    showResults(true)
  }

  render() {
    const { isSearch, results } = this.props
    const total = results.length

    return (
      <form className={cn('search-b')} onSubmit={this.handleSubmit}>
        <div className={cn('search-b-wrapper-input')}>
          <input type="text"
                 className={cn('search-b-input')}
                 value={this.state.query}
                 onChange={this.handleChange} />
          <Loupe className={cn('icon-loupe')} />
        </div>
        <button className={'btn btn-primary'}>Найти</button>

        { isSearch && (
          <p className={cn('search-b-results')}>
            {total ? `Найдено: ${total}` : 'Ничего не найдено'}
          </p>
        )}
      </form>
    )
  }
}



export default Search
