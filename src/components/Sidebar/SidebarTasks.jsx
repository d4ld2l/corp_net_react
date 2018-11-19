import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Checkbox from 'components-folder/Checkbox/Checkbox'

import { Pin, Avatar, Clip } from 'components-folder/Icon'

const cn = require('bem-cn')('sidebar-tasks')
if (process.env.BROWSER) {
  require('./sidebar-tasks.css')
}

const DATA = [
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: 'Переговорка 305',
    marker: <Pin className={cn('table-text-icon')} />,
  },
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: null,
    marker: null,
  },
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: 'Переговорка 305',
    marker: <Pin className={cn('table-text-icon')} />,
  },
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: null,
    marker: null,
  },
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: null,
    marker: null,
  },
  {
    time: '12:15',
    title: 'Интервью с руководителем',
    post: 'Специалист по расследованию инцидентов информационной безопастности',
    manager: 'Ирина Васильева',
    candidate: 'Геннадий Семенов',
    conversation_room: null,
    marker: null,
  },
]

export default class SidebarTasks extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      currentTab: 'today',
    }
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className={cn}>
        <div className={cn('tabs')}>
          <ul className={cn('tabs-list').mix('lsn pl0 mb0 clearfix')}>
            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ surrent: currentTab == 'today' })}
              onClick={() => this.setState({ currentTab: 'today' })}
            >
              Сегодня
            </li>

            <li
              className={cn('tabs-list-item')
                .mix('cur')
                .state({ surrent: currentTab == 'tomorrow' })}
              onClick={() => this.setState({ currentTab: 'tomorrow' })}
            >
              Завтра
            </li>
          </ul>
        </div>

        {currentTab == 'today' && (
          <div className={cn('table-wrap')}>
            <table className={cn('table')}>
              <tbody className={cn('tbody')}>
                {DATA.map((e, i) => (
                  <tr key={i} className={cn('table-tr')}>
                    <td className={cn('table-td-block')}>
                      <div className="row">
                        <div className={cn('table-time-wrap').mix('col-xs-12')}>
                          <Checkbox>
                            <span className={cn('table-time')}>{e.time}</span>
                          </Checkbox>
                        </div>
                      </div>
                      <div className={cn('table-text-wrap').mix('col-xs-offset-1 col-xs-11')}>
                        <a href="/" className={cn('table-title')}>
                          {e.title}
                        </a>
                        <div className="row">
                          <div className={cn('table-post').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>
                              <Clip className={cn('table-text-icon')} />
                            </div>
                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <p className={cn('table-text')}>{e.post}</p>
                            </div>
                          </div>

                          <div className={cn('table-work-staff').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>
                              <Avatar className={cn('table-text-icon')} />
                            </div>

                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <Link className={cn('table-text-link')} to="/recruitment/my">
                                {e.manager}
                              </Link>
                              <p className={cn('table-subtext')}>Менеджер</p>
                            </div>
                            <div className={cn('table-padding').mix('col-xs-offset-1 col-xs-11')}>
                              <Link className={cn('table-text-link')} to="/recruitment/my">
                                {e.candidate}
                              </Link>
                              <p className={cn('table-subtext')}>Кандидат</p>
                            </div>
                          </div>

                          <div className={cn('table-location').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>{e.marker}</div>
                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <p className={cn('table-text')}>{e.conversation_room}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentTab == 'tomorrow' && (
          <div className={cn('table-wrap')}>
            <table className={cn('table')}>
              <tbody className={cn('tbody')}>
                {DATA.map((e, i) => (
                  <tr key={i} className={cn('table-tr')}>
                    <td className={cn('table-td-block')}>
                      <div className="row">
                        <div className={cn('table-time-wrap').mix('col-xs-12')}>
                          <div className="checkbox">
                            <input type="checkbox" className="checkbox-custom" />
                            <span className="checkbox-pseudo" />
                            <span className={cn('table-time')}>{e.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cn('table-text-wrap').mix('col-xs-offset-1 col-xs-11')}>
                        <a href="/" className={cn('table-title')}>
                          {e.title}
                        </a>
                        <div className="row">
                          <div className={cn('table-post').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>
                              <Clip className={cn('table-text-icon')} />
                            </div>
                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <p className={cn('table-text')}>{e.post}</p>
                            </div>
                          </div>

                          <div className={cn('table-work-staff').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>
                              <Avatar className={cn('table-text-icon')} />
                            </div>

                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <Link className={cn('table-text-link')} to="/recruitment/my">
                                {e.manager}
                              </Link>
                              <p className={cn('table-subtext')}>Менеджер</p>
                            </div>
                            <div className={cn('table-padding').mix('col-xs-offset-1 col-xs-11')}>
                              <Link className={cn('table-text-link')} to="/recruitment/my">
                                {e.candidate}
                              </Link>
                              <p className={cn('table-subtext')}>Кандидат</p>
                            </div>
                          </div>

                          <div className={cn('table-location').mix('col-xs-12')}>
                            <div className={cn('table-icon').mix('col-xs-1')}>{e.marker}</div>
                            <div className={cn('table-padding').mix('col-xs-11')}>
                              <p className={cn('table-text')}>{e.conversation_room}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link to="/recruitment/tasks" className={cn('all-tasks-link').toString()}>
          Посмотреть все
        </Link>
      </div>
    )
  }
}
