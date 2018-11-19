import React, { PureComponent } from 'react'
import { times } from 'ramda'

if (process.env.BROWSER) {
  require('./styles.css')
}

export default class Grid extends PureComponent {
  state = { show: false }

  componentDidMount() {
    window.grid = {
      show: () => {
        this.setState({ show: true })
      },
      hide: () => {
        this.setState({ show: false })
      },
    }
  }

  render() {
    if (!this.state.show) return null

    return (
      <div className={'g'}>
        <div className={'g__rows'}>{times(i => <div key={i} className={'g__row'} />, 1000)}</div>
        <div className={'g__cols'}>{times(i => <div key={i} className={'g__col'} />, 12)}</div>
      </div>
    )
  }
}
