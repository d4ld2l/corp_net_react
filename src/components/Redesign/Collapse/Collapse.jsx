import React, { Component } from 'react'

import { Arrow } from '../../Icon'

const cn = require('bem-cn')('collapse')
if (process.env.BROWSER) {
  require('./collapse.css')
}

export default class Collapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: this.props.isExpanded,
    }
  }

  handleExpandedChange = () => {
    const { isExpanded } = this.state
    this.setState({
      isExpanded: !isExpanded,
    })
  }

  render() {
    const { isExpanded } = this.state
    const { label, count, children, className } = this.props

    return (
      <div className={cn.mix(className)}>
        <div className={cn('head')} onClick={this.handleExpandedChange}>
          <h2 className={cn('label')}>
            {label}
            {count && <sup className={cn('count')}>{count}</sup>}
          </h2>
          <span>
            <Arrow className={cn('arrow').mix(isExpanded && cn('arrow_open'))} />
          </span>
        </div>
        {isExpanded && <div className={cn('body')}>{children}</div>}
      </div>
    )
  }
}
