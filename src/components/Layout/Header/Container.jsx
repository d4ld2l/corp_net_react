import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserMenu from './UserMenu'
import UserNotification from './UserNotification'
import Append from './Append'
import { Link } from 'react-router-dom'
import { Route, NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import onClickOutside from 'react-onclickoutside'

const cn = require('bem-cn')('main-header')

if (process.env.BROWSER) {
  require('./Container.css')
}

const routes = [
  {
    path: '/recruitment/my',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/vacancies',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/candidates/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task/">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics/">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/candidates/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task/">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics/">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/employees/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>
      </div>
    ),
  },
  {
    path: '/employees/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>
      </div>
    ),
  },
  {
    path: '/employees',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>
      </div>
    ),
  },
  {
    path: '/structure',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>
      </div>
    ),
  },
  {
    path: '/distribution',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/structure">
          ОРГ. СТРУКТУРА
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/employees">
          СПИСОК СОТРУДНИКОВ
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/distribution">
          Команды
        </NavLink>
      </div>
    ),
  },
  {
    path: '/services',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/services/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/services/:id/bids/new',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/bids',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/bids/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/bids/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/services">
          Каталог сервисов
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/bids">
          Мои заявки
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/vacancies/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/vacancies/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/vacancies/new/recruiter',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/candidates',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/*<NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">*/}
        {/*Кандидаты*/}
        {/*</NavLink>*/}
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/:id/comparison',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/*<NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">*/}
        {/*Кандидаты*/}
        {/*</NavLink>*/}
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/:id/comparison/pdf',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/*<NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">*/}
        {/*Кандидаты*/}
        {/*</NavLink>*/}
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/vacancies/:id/edit/recruiter/info',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/*<NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">*/}
        {/*Кандидаты*/}
        {/*</NavLink>*/}
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
  {
    path: '/recruitment/analytics',
    exact: true,
    activeClassName: true,
    menu: () => (
      <div>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/my">
          Мои вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/vacancies">
          Вакансии
        </NavLink>
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">
          Кандидаты
        </NavLink>
        {/*<NavLink className={cn('intranet-link').toString()} to="/recruitment/candidates">*/}
        {/*Кандидаты*/}
        {/*</NavLink>*/}
        {/* <NavLink className={cn('intranet-link').toString()} to="/recruitment/task">
          Задачи
        </NavLink>*/}
        <NavLink className={cn('intranet-link').toString()} to="/recruitment/analytics">
          Аналитика
        </NavLink>
      </div>
    ),
  },
]


const append = [
  {
    path: '/recruitment/my',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/candidates/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/candidates/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/vacancies',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/vacancies/:id',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/vacancies/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/vacancies/new/recruiter',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/candidates',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/:id/comparison',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/:id/comparison/pdf',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/vacancies/:id/edit/recruiter/info',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
  {
    path: '/recruitment/analytics',
    exact: true,
    activeClassName: true,
    menu: () => (
      <Append />
    ),
  },
]

const connector = connect(state => ({ user: state.user }), {})

class Container extends Component {
  static propTypes = {}

  render() {
    const { logoutUser, name, avatar, middlename, email, surname, user } = this.props

    return (
      <div className={cn}>
        <div className={'container'}>
          <Row>
            <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
              <div className={cn('container')}>
                <section className={cn('wrapper-sub-routes')}>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.menu}
                    />
                  ))}
                </section>

                <UserNotification/>

                <UserMenu
                  avatar={avatar}
                  logoutUser={logoutUser}
                  name={name}
                  middlename={middlename}
                  email={email}
                  surname={surname}
                  user={user}
                />
                {append.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.menu}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connector(Container)
