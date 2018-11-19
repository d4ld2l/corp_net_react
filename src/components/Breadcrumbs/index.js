import React from 'react'
import { Link, Route } from 'react-router-dom'
import { ArrowBreadcrumbs } from '../Icon'
import { connect } from 'react-redux'

const cn = require('bem-cn')('breadcrumbs')

if (process.env.BROWSER) {
  require('./style.css')
}

const BreadcrumbsItem = ({ active, name, location, style }) => {
  return (
    <li className={cn('item')}>
      {active ? (
        <span style={style} className={'p2 p1_theme_light_third'}>{name}</span>
      ) : (
        <div>
          <Link
            to={location}
            className={cn('link').mix('link p2 link_theme_light_second')}
            title={'Нажмите, чтобы перейти'}
            style={style}
          >
            {name}
          </Link>
          <ArrowBreadcrumbs style={style} className={cn('arrow')} />
        </div>
      )}
    </li>
  )
}

const BreadcrumbsList = ({ breadcrumbs, style, system }) => {
  const { intranetBreadcrumbs } = system
  return (
    <ul className={cn('list')}>
      <BreadcrumbsItem name={'Главная'} location={'/'} style={style}/>
      {recruitment.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact} component={route.menu} />
      ))}
      {/*{routes.map((route, index) => (*/}
        {/*<Route key={index} path={route.path} exact={route.exact} component={route.menu} />*/}
      {/*))}*/}
      {
        intranetBreadcrumbs.filter(it => it.enabled ).map( (it) => (
          it.paths.map((i, index) => (
            <Route key={i} path={i} exact={true} render={ () => (
              <BreadcrumbsItem name={it.label} active={index === 0} location={it.paths[0]} style={style}/>
            )
            } />
          ))
        ))
      }
      {breadcrumbs &&
        breadcrumbs.map((it, i) => (
          <BreadcrumbsItem
            key={it.name + i}
            name={it.name}
            location={it.location}
            active={it.active}
            style={style}
          />
        ))}
    </ul>
  )
}

const Breadcrumbs = props => {
  return (
    <div className={cn.mix('indent_10')}>
      <BreadcrumbsList {...props} />
    </div>
  )
}

const recruitment = [
  {
    path: '/recruitment/my',
    exact: false,
    menu: () => <BreadcrumbsItem name={'Рекрутинг'} location={'/recruitment/my'} />,
  },
]

const routes = [
  {
    path: '/news',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Новости'} active />,
  },
  {
    path: '/news/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Новости'} location={'/news'} />,
  },
  {
    path: '/services',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Каталог сервисов'} active />,
  },
  {
    path: '/services/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Каталог сервисов'} location={'/services'} />,
  },
  {
    path: '/services/:id/bids/new',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Каталог сервисов'} location={'/services'} />,
  },
  {
    path: '/bids',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Мои заявки'} active />,
  },
  {
    path: '/bids/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Мои заявки'} location={'/bids'} />,
  },
  {
    path: '/bids/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Мои заявки'} location={'/bids'} />,
  },
  {
    path: '/surveys',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Опросы'} active />,
  },
  {
    path: '/surveys/:id/publication',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Опросы'} location={'/surveys'} />,
  },
  {
    path: '/surveys/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Опросы'} location={'/surveys'} />,
  },
  {
    path: '/employees',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} active />,
  },
  {
    path: '/personel-roaster-employees',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} active />,
  },
  {
    path: '/employees/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} location={'/employees'} />,
  },
  {
    path: '/employees/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} location={'/employees'} />,
  },
  {
    path: '/employees/:id/edit/resume',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} location={'/employees'} />,
  },
  {
    path: '/structure',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} location={'/employees'} />,
  },
  {
    path: '/distribution',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список сотрудников'} location={'/employees'} />,
  },
  {
    path: '/projects',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Проекты'} active />,
  },
  {
    path: '/projects/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Проекты'} location={'/projects'} />,
  },
  {
    path: '/projects/:id/edit',
    exact: true,
    activeClassName: true,
    menu: () => <BreadcrumbsItem name={'Проекты'} location={'/projects'} />,
  },
  {
    path: '/tasks',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Список задач'} active />,
  },
  {
    path: '/calendar',
    exact: true,
    activeClassName: true,
    menu: () => <BreadcrumbsItem name={'Календарь'} active />,
  },
  {
    path: '/calendar/new-event',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Календарь'} location={'/calendar'} />,
  },
  {
    path: '/calendar/events/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Календарь'} location={'/calendar'} />,
  },
  {
    path: '/calendar/events/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Календарь'} location={'/calendar'} />,
  },
  {
    path: '/community',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Кухня Лиги'} active />,
  },
  {
    path: '/discussion',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Обсуждения'} active />,
  },
  {
    path: '/settings',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Настройки'} active />,
  },
  {
    path: '/recruitment/vacancies',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Вакансии'} active />,
  },
  {
    path: '/recruitment/vacancies/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Вакансии'} location={'/recruitment/vacancies'} />,
  },
  {
    path: '/recruitment/vacancies/new/recruiter',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Вакансии'} location={'/recruitment/vacancies'} />,
  },
  {
    path: '/recruitment/vacancies/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Вакансии'} location={'/recruitment/vacancies'} />,
  },
  {
    path: '/recruitment/candidates',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Кандидаты'} active />,
  },
  {
    path: '/recruitment/candidates/:id',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Кандидаты'} location={'/recruitment/candidates'} />,
  },
  {
    path: '/recruitment/candidates/:id/comparison',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Кандидаты'} location={'/recruitment/candidates'} />,
  },
  {
    path: '/recruitment/candidates/:id/edit',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Кандидаты'} location={'/recruitment/candidates'} />,
  },
  {
    path: '/recruitment/analytics',
    exact: true,
    menu: () => <BreadcrumbsItem name={'Воронка подбора'} active />,
  },
]
const connector = connect(state => ({
  system: state.system,
}))

export default connector(Breadcrumbs)
