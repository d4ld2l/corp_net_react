import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DATA from './data'

const cn = require('bem-cn')('intranet-menu')

if (process.env.BROWSER) {
  require('./Container.css')
}

export default class Container extends Component {
  render() {
    return (
      <div className={cn}>
        <div className={cn('container').mix('container')}>
          <Link to={'/'} className={cn('logo')}>
            <img
              src="/public/main-logo.png"
              alt="project logo"
              className={cn('logo-image').mix('img-responsive')}
            />
          </Link>

          <ul className={cn('list').mix('lsn pl0 mb0')}>
            {DATA.menu.map((e, i) => (
              <li className={cn('list-item')} key={i}>
                <NavLink to={e.to} className={cn('list-link').toString()} activeClassName="active">
                  {e.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
