import React, { Component } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Participants from './StbParticipants/Container'
import GeneralTeamBuilding from './GeneralTeamBuilding'
import { Arrow } from 'components-folder/Icon'
import ClickOutside from 'components-folder/ClickOutside'
import { getStbParticipants } from 'redux-folder/actions/bidsActions'
import 'components-folder/Tabs/tabs.css'
import Search from './StbParticipants/Search'

const cn = require('bem-cn')('intranet-bid')

const connector = compose(
  connect(
    state => ({
      loading_stbParticipants: state.loaders.stbParticipants,
      stb_participants: state.stbParticipants.current,
      stbParticipantsSearch: state.stbParticipants.search,
      role: state.role,
    }),
    dispatch => ({
      getStbParticipants: (...args) => dispatch(getStbParticipants(...args)),
    })
  ),
  reduxForm({ form: 'TeamBuilding' })
)

class TeamBuilding extends Component {
  state = {
    currentTab: 'general-info',
  }

  getStbParticipants = () => {
    const { bid, dispatch } = this.props
    dispatch(getStbParticipants(bid.id | 0))
  }

  render() {
    const { currentTab } = this.state
    const {
      bid,
      user,
      toggleActions,
      onCloseActions,
      onChangeState,
      onEdit,
      actions,
      role,
    } = this.props

    return (
      <div>
        <h1 className={cn('title')}>
          Заявка {bid.id}{' '}
          <div className={cn('bid-actions-buttons')}>
            {role.stb_report &&
              (
                <a
                  href={`/api/bids/${bid.id}/build.docx`}
                  download={true}
                  className={cn('bid-actions-button-outline')}
                >
                  Скачать отчет
                </a>
              )
            }
            { bid.manager && bid.manager.id === user.id && bid.allowed_states.length > 0 && (
              <ClickOutside onClick={onCloseActions}>
                  <span
                    tabIndex={'0'}
                    onClick={toggleActions}
                    className={cn('bid-actions-button').mix('btn btn-primary')}
                  >
                    Действия <Arrow color={'#fff'} className={cn('bid-actions-arrow')} />
                    {actions && role.stb_transition && (
                      <div className={cn('bid-actions-wrap')}>
                        <div className={cn('bid-actions')}>
                          {bid.allowed_states.map(it => (
                            <div
                              key={it.code}
                              onClick={() => onChangeState(it.code)}
                              className={cn('bid-actions-item')}
                            >
                              {it.button_name}
                            </div>
                          ))}

                          {bid.stage !== 'Отклонена' &&
                          bid.stage !== 'Исполнена' && role.stb_crud && (
                            <div onClick={onEdit} className={cn('bid-actions-item')}>
                              Редактировать
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </span>
              </ClickOutside>
            )}
          </div>
        </h1>

        <div className="tabs" style={{ marginTop: '30px' }}>
          <ul className="tabs__list">
            <li
              className={cn('tabs-item')
                .mix('tabs__item')
                .state({
                  current: currentTab === 'general-info'
                })}
              onClick={() => this.setState({ currentTab: 'general-info' })}
            >
              Общая информация
            </li>
            <li
              className={cn('tabs-item')
                .mix('tabs__item')
                .state({
                  current: currentTab === 'participants'
                })}
              onClick={() => {
                this.getStbParticipants()
                return this.setState({ currentTab: 'participants' })
              }}
            >
              Участники
              <sup className={'tabs__count'}>
                {
                  bid.team_building_information
                    .team_building_information_accounts.length
                }
              </sup>
            </li>
          </ul>
        </div>
        <div className={'tabs__content'}>
          {currentTab === 'general-info' && (
            <GeneralTeamBuilding {...this.props} />
          )}
          {currentTab === 'participants' &&
            <div>
              <Search key="searchTbl" {...this.props}/>
              <Participants {...this.props} />
            </div>
            }
        </div>
      </div>
    )
  }
}
export default connector(TeamBuilding)
