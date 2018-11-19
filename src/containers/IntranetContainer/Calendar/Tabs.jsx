import React, { Component } from 'react'

const cn = require('bem-cn')('intranet-calendar')

if (process.env.BROWSER) {
  require('react-big-calendar/lib/css/react-big-calendar.css')
  require('./Container.css')
}

export default class Tabs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'all',
    }
  }
  render() {
    const { types, setType } = this.props
    const { name } = this.state
    // const borderAll = this.state.name !== 'all' ? { borderBottom: '1px dashed #ff2f51' } : {}
    return (
      <ul className={cn('tabs-inner')}>
        <li
          style={{ color: '#ff2f51' }}
          className={cn('tabs-inner-item')
            .mix('cur')
            .state({
              current: name === 'all',
            })}
          onClick={() => {
            this.setState({ name: 'all' })
            setType({ name: 'all' })
          }}
        >
          <span>Все события</span>
        </li>
        {types.map(type => {
          // const border =
          //   this.state.name !== type.name ? { borderBottom: `1px dashed ${type.color}` } : {}
          return (
            <li
              style={{ color: type.color }}
              key={Math.random()}
              className={cn('tabs-inner-item')
                .mix('cur')
                .state({
                  current: name === type.name,
                })}
              onClick={() => {
                this.setState({ name: type.name })
                setType(type)
              }}
            >
              <i className={cn('event-round')} style={{ backgroundColor: type.color }} />
              <span>{type.name}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
