import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { cn } from './Container'

export default class Header extends PureComponent {
  render() {
    const { name } = this.props
    return (
      <div className={cn('head')}>
        <Helmet>
          <title>{name}</title>
        </Helmet>
        <h1 className={cn('head-title')}>{name}</h1>
      </div>
    )
  }
}
