import React, { PureComponent } from 'react'

const cn = require('bem-cn')('loader')
if (process.env.BROWSER) {
  require('./style.css')
}
export default class Loader extends PureComponent<{}> {
  render() {
    return (
      <div className={cn('container')}>
        <svg className={cn('spinner')} viewBox="25 25 50 50">
          <circle className={cn('spinner-circle')} cx="50" cy="50" r="20" fill="none" />
        </svg>
      </div>
    )
  }
}
