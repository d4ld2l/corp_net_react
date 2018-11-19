import React, { Component } from 'react'

const cn = require('bem-cn')('main-footer')
if (process.env.BROWSER) {
  require('./style.css')
}
type Props = {}

type State = {}

class Footer extends Component<Props, State> {
  state = {}

  render() {
    return (
      <footer className={cn}>
        <div className="container">
          <div className={cn('time')}>© {new Date().getFullYear()}</div>
          <div className={cn('version')}>версия 1</div>
        </div>
      </footer>
    )
  }
}
export default Footer
