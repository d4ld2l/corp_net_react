import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import News from '../News'
import Sidebar from '../Sidebar'
import Aside from '../Aside'

const cn = require('bem-cn')('intranet-content')

if (process.env.BROWSER) {
  require('./Container.css')
}

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { routes } = this.props
    return (
      <div className={cn}>
        <div className="container">
          <div className={cn('container')}>
            <div className={cn('aside')}>
              <Aside routes={routes} />
            </div>

            <div className={cn('content')}>
              <div className={cn('row').mix('row')}>
                <div className={cn('col-xs-8').mix('col-xs-8')}>
                  <News />
                </div>

                <div className={cn('col-xs-4').mix('col-xs-4')}>
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
