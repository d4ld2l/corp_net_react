import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-router-dom'
import { Plus } from '../../Icon'

const cn = require('bem-cn')('main-header')

const routes = [
  {
    path: '/recruitment/my',
    exact: true,
    append: () => (
      <div>
        <Plus className={cn('create-icon')} />
      </div>
    ),
  }
]

if (process.env.BROWSER) {
  require('./Container.css')
}

class Append extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      openAppend: false,
    }
  }

  handleClickOutside = () => {
    this.handkerCloseAppend()
  }

  render() {
    const { openAppend } = this.state

    return (
      <div>
        <div
          className={cn('append')
            .mix('cur')
            .state({ open: openAppend })}
          onClick={() => {
            openAppend ? this.handkerCloseAppend() : this.handkerOpenAppend()
          }}
          title={openAppend ? 'Закрыть' : 'Открыть'}
        >
          {routes.map((route, index) => (
            <Route key={index} exact={route.exact} component={route.append} />
          ))}
        </div>

        {openAppend && (
          <div className={cn('append-menu')}>
            <ul className={cn('append-menu-list')}>
              <li className={cn('append-menu-list-item')}>
                <Link
                  className={cn('append-menu-list-item-link')}
                  to={`/recruitment/vacancies/new/recruiter`}
                >
                  Новая вакансия
                </Link>
              </li>
              <li className={cn('append-menu-list-item')}>
                <Link
                  className={cn('append-menu-list-item-link')}
                  to={`/recruitment/candidates/new`}
                >
                  Новый кандидат
                </Link>
              </li>
              {/* <li className={cn('append-menu-list-item')}>
                <Link className={cn('append-menu-list-item-link')} to={`/`}>
                  Новая задача
                </Link>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    )
  }

  handkerOpenAppend = () => {
    this.setState({ openAppend: true })
  }

  handkerCloseAppend = () => {
    this.setState({ openAppend: false })
  }
}
export default onClickOutside(Append)
