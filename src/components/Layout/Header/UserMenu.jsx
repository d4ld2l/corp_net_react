import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import { Link, Route } from 'react-router-dom'
import { Avatar } from '../../Icon'
import get from 'lodash/get'
import NotifyBlind from '../../../containers/IntranetContainer/NotifyBlind'

const cn = require('bem-cn')('user-menu')

if (process.env.BROWSER) {
  require('./UserMenu.css')
}

const notifyBlind = [
  {
    path: '/bids/:id',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
  {
    path: '/surveys/:id',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
  {
    path: '/recruitment/vacancies/:id',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
  {
    path: '/projects/:id',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
  {
    path: '/calendar/events/:id',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
  {
    path: '/distribution',
    exact: true,
    activeClassName: true,
    button: () => <NotifyBlind />,
  },
]

class UserMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openUserMenu: false,
    }
  }

  handleClickOutside = () => {
    this.handkerCloseUserMenu()
  }

  render() {
    const { avatar, name, middlename, email, surname, user } = this.props
    const { openUserMenu } = this.state

    return (
      <div className={cn}>
        <div
          className={cn('icons')
            .mix('cur')
            .state({ open: openUserMenu })}
          onClick={() => {
            if (openUserMenu) {
              this.handkerCloseUserMenu()
            } else {
              this.handkerOpenUserMenu()
            }
          }}
        >
          <div className={cn('avatar')}>
            {avatar ? (
              <div className={cn('avatar-image')}>
                <div
                  className={cn('avatar-image-icon')}
                  style={{
                    background: `url(${avatar ? avatar : '/public/avatar.png'}) center center / cover no-repeat`,
                  }}
                />
              </div>
            ) : (
              <div className={cn('avatar-default')}>
                <Avatar className={cn('avatar-default-icon')} />
              </div>
            )}
          </div>

          {/* <ChevronDownIcon className={cn('arrow-icon')} /> */}
        </div>

        {notifyBlind.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.button} />
        ))}

        {openUserMenu && (
          <div className={cn('menu')}>
            <div className={cn('menu-info')}>
              <div className={cn('menu-media').mix('media')}>
                <div className={cn('menu-media-figure').mix('media-figure')}>
                  {avatar ? (
                    <div className={cn('menu-image')}>
                      <div
                        className={cn('menu-image-icon')}
                        style={{
                          background: `url(${avatar ? avatar : '/public/avatar.png'}) center center / cover no-repeat`,
                        }}
                      />
                    </div>
                  ) : (
                    <div className={cn('menu-image-default')}>
                      <Avatar className={cn('menu-image-default-icon')} />
                    </div>
                  )}
                </div>
                <div className={cn('menu-media-body').mix('media-body')}>
                  <div className={cn('menu-name')}>{`${surname} ${name} ${middlename}`}</div>

                  <div className={cn('menu-email')}><a href={`mailto:${email}`} className={'link link_theme_light_second'} title={'Нажмите, чтобы написать'}>{`${email}`}</a></div>
                </div>
              </div>
            </div>

            <div className={cn('menu-card').mix('cur')}>
              <Link to={`/employees/${user.id}`}>Личная карточка</Link>
            </div>
            {/*<div className={cn('menu-card').mix('cur')}>*/}
              {/*<a*/}
                {/*href={`${process.env.ADMIN_HOST}profiles/${user.id}/edit`}*/}
                {/*target="_blank"*/}
                {/*rel="noopener noreferrer"*/}
              {/*>*/}
                {/*Редактирование*/}
              {/*</a>*/}
            {/*</div>*/}
            <div className={cn('menu-card').mix('cur')}>
              <Link to={`/settings`}>Настройки</Link>
            </div>

            <div className={cn('menu-footer')}>
              {/*<div className={cn('menu-settings').mix('cur')}>*/}
              {/*Настройки*/}
              {/*</div>*/}

              <div className={cn('menu-exit').mix('cur')} onClick={this.props.logoutUser}>
                Выйти
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  handkerOpenUserMenu = () => {
    this.setState({ openUserMenu: true })
  }

  handkerCloseUserMenu = () => {
    this.setState({ openUserMenu: false })
  }
}

export default onClickOutside(UserMenu)
