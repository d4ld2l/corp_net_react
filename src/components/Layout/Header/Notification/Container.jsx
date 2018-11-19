import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserMenu from '../UserMenu'
import UserNotification from './UserNotification'
import Append from '../Append'
import { Link } from 'react-router-dom'
import { Route, NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import onClickOutside from 'react-onclickoutside'
import Wrapper from 'components-folder/Wrapper'

const cn = require('bem-cn')('main-header')

if (process.env.BROWSER) {
  require('../Container.css')
}

const topMenuLink = (type: string) => {
  switch (type) {
    case 'recruitmentMyVacancy':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>)
    case 'recruitmentVacancy':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>)
    case 'recruitmentCandidates':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>)
    case 'recruitmentAnalytics':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>)
    case 'recruitmentTasks':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>)
    case 'shrOrg':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>)
    case 'shrEmployees':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>)
    case 'shrTeams':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>)
    case 'shrServices':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>)
    case 'shrBids':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>)
    case 'shrTasks':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/tasks">
          Список задач
        </NavLink>)
    case 'shrCalendar':
      return (
        <NavLink className={cn('intranet-link').toString()} to="/calendar">
          Календарь
        </NavLink>)
  }
}

const connector = connect(state => ({ user: state.user, system: state.system }), {})

class Container extends Component {
  static propTypes = {}

  render() {
    const { logoutUser, name, avatar, middlename, email, surname, user, system: {topMenu, appendMenuPaths, enabledComponents} } = this.props
    return (
      <div className={cn}>
        <Wrapper>
          <div className={cn('container')}>
            <section className={cn('wrapper-sub-routes')}>
              {
                topMenu.map((route) =>
                  (
                    route.paths.map((path) => (
                      <Route
                        key={path}
                        path={path}
                        exact={true}
                        render={() => (
                          <div>{ route.listMenu.length > 1 && route.listMenu.map( it => topMenuLink(it)) }</div>
                        )}
                      />
                    ))
                  )
                )
              }
            </section>
            {/*<UserNotification/>*/}

            <UserMenu
              avatar={avatar}
              logoutUser={logoutUser}
              name={name}
              middlename={middlename}
              email={email}
              surname={surname}
              user={user}
            />
            {appendMenuPaths.map((path) => (
              <Route
                key={path}
                path={path}
                exact={true}
                render={() => (
                  <Append />
                )}
              />
            ))}
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default connector(Container)
