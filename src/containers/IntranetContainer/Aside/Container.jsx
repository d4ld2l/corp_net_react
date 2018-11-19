import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Sticky from 'react-stickynode'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import {
  About,
  Calendar,
  Chat,
  Dashboard,
  Personal,
  Project,
  Service,
  Recruiting,
  Community,
  Survey,
  Logo,
  DataStorage,
  Birthday,
  UniLogo,
  Assessment
} from 'components-folder/Icon'

const cn = require('bem-cn')('intranet-nav-menu')
if (process.env.BROWSER) {
  require('./Container.css')
}

const navBarIcons = {
  menuCalendar: Calendar,
  menuChat: Chat,
  menuBirthday: Birthday,
  menuAbout: About,
  menuServices: Service,
  menuSurveys: Survey,
  menuDashboard: Dashboard,
  menuPersonal: Personal,
  menuRecruiting: Recruiting,
  menuProject: Project,
  menuLogo: Logo,
  menuCommunity: Community,
  menuDataStorage: DataStorage,
  uniLogo: UniLogo,
  menuAssessment: Assessment
}

const NavBarLink = props => {
  return (
    <NavLink
      {...props}
      exact={true}
      activeClassName="active"
      className={cn('list-link').toString()}
    />
  )
}

const connector = connect(pick(['system']))

class Container extends Component {
  render() {
    const { system: { menu } } = this.props

    return (
      <Sticky enabled top={0}>
        <aside className={cn}>
          <ul className={cn('list').mix('lsn pl0 mb0')}>
            <li className={cn('list-item').mix('intranet-nav-menu__list-item_color')}>
              <Link className={cn('main-link')} to={`/`}>
                {
                  !window.dcss.getVariable('main_logo_url') ?
                    (

                      <Logo className={cn('list-icon_logo')} />
                    ) :
                    (
                      <img className={cn('list-icon_logo')} src={window.dcss.getVariable('main_logo_url')} alt=""/>
                    )
                }
              </Link>
            </li>
            {menu.filter(it => it.enabled).map((e, i) => {
              const Icon = navBarIcons[e.icon]
              return (
                <li key={i} className={cn('list-item')}>
                  { e.target ? (
                    <Link to={e.path} className={cn('list-link')} title={e.label} target="_blank">
                      <Icon className={cn('list-icon').mix('intranet-nav-menu__list-icon_' + e.size)} />
                      <span className={cn('text-label').mix('p4 p4_theme_light_second')}>{e.label}</span>
                    </Link>
                  ) : (
                    <NavBarLink to={e.path} className={cn('list-link')} title={e.label}>
                      <Icon className={cn('list-icon').mix('intranet-nav-menu__list-icon_' + e.size)} />
                      <span className={cn('text-label').mix('p4 p4_theme_light_second')}>{e.label}</span>
                    </NavBarLink>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>
      </Sticky>
    )
  }
}
export default connector(Container)
