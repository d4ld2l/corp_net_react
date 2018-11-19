import React, { Component } from 'react'
import PropTypes from 'prop-types'

const cn = require('bem-cn')('employees-sorting')

if (process.env.BROWSER) {
  require('./employees-sorting.css')
}

const alphabet = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'э',
  'ю',
  'я',
]

export default class NewsSearchForm extends Component {
  static propTypes = {
    filterEmployees: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      active: 'Все',
    }
  }

  render() {
    const { filterEmployees, sortingValue } = this.props
    const active = sortingValue ? sortingValue : 'Все'

    return (
      <div className={cn}>
        <span
          className={cn('item').mix('link_theme_light_third link_pseudo p2 mr_10').state({
            current: active === 'Все',
          })}
          onClick={event => {
            this.setState({ active: event.target.innerText })
            filterEmployees(event)
          }}
        >
          все
        </span>
        {alphabet.map(symbol => (
          <span
            className={cn('item').mix('link_theme_light_third link_pseudo p2').state({
              current: active === symbol.toUpperCase(),
            })}
            onClick={event => {
              this.setState({ active: event.target.innerText })
              filterEmployees(event)
            }}
            key={symbol}
          >
            {symbol}
          </span>
        ))}
      </div>
    )
  }
}
