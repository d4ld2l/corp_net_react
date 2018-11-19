import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import { NewTaskModal } from '../Modals/NewTaskModal'

const cn = require('bem-cn')('main-menu')

if (process.env.BROWSER) {
  require('./style.css')
}

const NavBarLink = props => {
  return (
    <NavLink
      {...props}
      exact={false}
      activeClassName="active"
      className={cn('list-link').toString()}
    />
  )
}

const RenderRecursiveMenu = props => {
  return (
    <ul className={cn('list').mix('clearfix lsn pl0 mb0')}>
      {props.routes &&
        props.routes.map((e, i) => {
          if (e.showInMenu) {
            return (
              <li key={i} className={cn('list-item')}>
                <NavBarLink to={e.path} className={cn('list-link')} key={i}>
                  {e.label}
                </NavBarLink>
                {/* <RenderRecursiveMenu routes={e.routes} /> */}
              </li>
            )
          }
        })}
    </ul>
  )
}

const connector = connect(state => ({
  state,
  role: state.role,
}))

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { routes, dispatch, role } = this.props
    const lgClose = () => this.setState({ lgShow: false })

    return (
      <nav className={cn}>
        <div className={cn('container').mix('container')}>
          <Link to={'/recruitment/my'} className={cn('logo')}>
            <img
              src="/public/main-logo.png"
              alt="project logo"
              className={cn('logo-image').mix('img-responsive')}
            />
          </Link>

          <RenderRecursiveMenu routes={routes} />

          <Link
            to="/recruitment/vacancies/new/recruiter"
            className={cn('button-new-vacancy').mix('btn')}
            onClick={() => {
              dispatch(destroy('createVacancyChangeInfoForm'))
              dispatch(destroy('createVacancyChangeFullForm'))
            }}
          >
            Новая вакансия
          </Link>
          {role.create_task && (
            <button
              type="button"
              className={cn('button-new-task').mix('btn no-outline')}
              onClick={() => this.setState({ lgShow: true })}
            >
              Новая задача
            </button>
          )}
        </div>
        <NewTaskModal show={this.state.lgShow} onHide={lgClose} />
      </nav>
    )
  }
}

export default connector(Menu)
