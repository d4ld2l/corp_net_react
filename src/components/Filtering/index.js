import React, { Component } from 'react'
import { v4 } from 'uuid'

const cn = require('bem-cn')('filtering')

if (process.env.BROWSER) {
  require('./filtering.css')
}

export default class Filtering extends Component {
  state = {
    currentBtn: this.props.current,
    filtering: this.props.filtering,
  }

  render() {
    const { currentBtn, filtering } = this.state
    const { showCount, style, className, onClick } = this.props

    return (
      <div className={cn.mix(className)} style={style}>
        {filtering.map(it => (
          <button
            key={v4()}
            className={cn('btn').state({ current: currentBtn === it.id })}
            onClick={() => {
              this.setState({ currentBtn: it.id })
              onClick && onClick(it)
            }}
            data-name={it.id}
          >
            {it.name}
            {showCount && <sup className={cn('count')}>{it.count}</sup>}
          </button>
        ))}
      </div>
    )
  }
}
