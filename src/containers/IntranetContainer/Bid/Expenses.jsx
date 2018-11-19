import React, { Component } from 'react'

import moment from "moment/moment"
import { Col } from 'react-bootstrap'
import BootstrapTextarea from "components-folder/Form/BootstrapTextarea"
import {required} from "lib-folder/validation"
import { Arrow, Close } from 'components-folder/Icon'
import ClickOutside from 'components-folder/ClickOutside'
import { Field } from 'redux-form'
import { get } from 'lodash'


const cn = require('bem-cn')('intranet-bid')


export default class Expenses extends Component {
  state = {
    isToggleWindowMod: true,
  }

  handleClick = () => {
    this.setState({
      isToggleWindowMod: !this.state.isToggleWindowMod,
    })
  }

  get participantInfo() {
    const { bid } = this.props
    return get(bid, 'representation_allowance.information_about_participant')
  }

  get meetingInfo() {
    const { bid } = this.props
    return get(bid, 'representation_allowance.meeting_information')
  }

  get projectCode() {
    return get(this.participantInfo, 'project.charge_code') //non_responsible_participants
  }

  get participants() {
    return get(this.participantInfo, 'non_responsible_participants', []).filter(p => p.account.id).map(p => p.account)
  }

  get responsibleParticipant() {
    return get(this.participantInfo, 'responsible_participant.account')
  }

  get invitees() {
    return get(this.participantInfo, 'not_responsible_counterparties')
  }

  get responsibleInvitee() {
    return get(this.participantInfo, 'responsible_counterparty')
  }

  get assistant() {
    return get(this.props.bid, 'assistant')
  }

  get matchingUser() {
    return get(this.props.bid, 'matching_user')
  }

  get author() {
    return get(this.props.bid, 'author')
  }

  get manager() {
    return get(this.props.bid, 'manager')
  }

  render() {
    const { bid, user, renderComment, toggleActions, onCloseActions, onChangeState, onEdit, actions } = this.props

    return (
      <div>
        <h1 className={cn('title')}>
          Заявка {bid.id}{' '}

          <div className={cn('bid-actions-buttons')}>
            <a
              href={`/api/bids/${bid.id}/build.docx`}
              download={true}
              className={cn('bid-actions-button-outline')}
            >
              Скачать отчет
            </a>
            {bid.manager && bid.manager.id === user.id && bid.allowed_states.length > 0 && (
              <ClickOutside onClick={onCloseActions}>
                  <span tabIndex={'0'} onClick={toggleActions} className={cn('bid-actions-button').mix('btn btn-primary')}>
                    Действия <Arrow color={'#fff'} className={cn('bid-actions-arrow')} />

                    {actions && (
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

                          {bid.stage !== 'Отклонена' && bid.stage !== 'Исполнена' && (
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

        {this.state.isToggleWindowMod ? (
          ''
        ) : (
          <div className={cn('wrapper-window-modification')}>
            <div className={cn('window-modification')}>
              <div className={cn('window-modification-header')}>
                <h1>Отправить заявку на доработку</h1>
                <button className={cn('window-modification-close')} onClick={this.handleClick}>
                  <Close fat className={cn('window-modification-close-icon')} />
                </button>
              </div>
              <form className={cn('window-modification-form')}>
                <Field
                  component={BootstrapTextarea}
                  name="modification"
                  validate={[required]}
                  label="Комментарий"
                />
                <button className="btn btn-primary">перевести</button>
              </form>
            </div>
          </div>
        )}

        <div className={cn('container')}>
          <div className={cn('main')}>
            <h2 className={cn('main-header')}>Участники</h2>

            <div className={cn('inner')}>
              <div className={cn('inner-l')}>
                <div className={cn('inner-participants-from').mix('pi p1_theme_light_first')}>
                  <span className={cn('inner-participants-from-highlight')}>Участники от</span>{' '}
                  {bid.legal_unit && bid.legal_unit.name}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Ответственный</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {this.responsibleParticipant && [
                      <div
                        style={{
                          background: `url(${this.responsibleParticipant.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />,
                      <section>
                        <span className={('p1 p1_theme_light_first')}>{this.responsibleParticipant.full_name}</span>
                        <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>{this.responsibleParticipant.position_name}</div>
                      </section>
                    ]}

                  </section>
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Ассистент</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {this.assistant && this.assistant.full_name ? (
                      <div
                        style={{
                          background: `url(${this.assistant.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />
                    ) : (
                      ''
                    )}

                    <section>
                      <span className={('p1 p1_theme_light_first indent_3')}>{this.assistant && this.assistant.full_name}</span>
                      <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>
                        {this.assistant && this.assistant.position_name}
                      </div>
                    </section>
                  </section>
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Код проекта</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {this.projectCode}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Согласующий</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {this.matchingUser ? (
                      <div
                        style={{
                          background: `url(${this.matchingUser.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />
                    ) : (
                      ''
                    )}

                    <section>
                      <span className={('p1 p1_theme_light_first')}>{this.matchingUser && this.matchingUser.full_name}</span>
                      <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>
                        {this.matchingUser && this.matchingUser.position_name}
                      </div>
                    </section>
                  </section>
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Список участников</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {this.participants.map((participant, index) => (
                    <div key={index} className={cn('inner-content-item')}>
                      <span className={('p1 p1_theme_light_first')}>{index + 1}.</span>

                      <section className={cn('wrapper-data')}>
                        <div
                          style={{
                            background: `url(${participant.photo.url}) center center / cover no-repeat`,
                          }}
                          className={cn('participant-photo')}
                        />

                        <section>
                          <span className={('p1 p1_theme_light_first')}>{participant.full_name}</span>
                          <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>{participant.position_name}</div>
                        </section>
                      </section>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn('inner-r')}>
                <h5>Приглашенные участники</h5>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Название организации</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {get(this.participantInfo, 'customer.name')}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>ФИО ответственного</div>
                { this.responsibleInvitee && (
                  <div className={cn('inner-content').mix('p1 p1_theme_light_first indent_3')}>
                    {this.responsibleInvitee.name}
                    <div className={cn('inner-content-item-position').mix('p2 p2_theme_light_second')}>
                      {this.responsibleInvitee.position}
                    </div>
                  </div>
                )}

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Список участников</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {this.invitees.map(
                    (participant, index) => (
                      <div key={index} className={cn('inner-content-item')}>
                        <span className={('p1 p1_theme_light_first')}>{index + 1}.</span>
                        <span className={cn('participant-name')}>{participant.name}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <h2 className={cn('main-header')}>Детали встречи</h2>
            <div className={cn('inner')}>
              <div className={cn('inner-l')}>
                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Дата и время встречи</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {moment(this.meetingInfo.starts_at).format('DD.MM.YYYY HH:mm')}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Место встречи</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{this.meetingInfo.place}</div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Адрес</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{this.meetingInfo.address}</div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Сумма компенсации</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{this.meetingInfo.amount} руб.</div>

                {this.meetingInfo.document && this.meetingInfo.document.length > 0 && [
                  <div key={'label'} className={cn('inner-label').mix('p3 p3_theme_light')}>
                    Документы
                  </div>,

                  <div key={'content'} className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                    {this.meetingInfo.document.map((document, index) => (
                      <div key={index} className={('p1 p1_theme_light_first')}>
                        {index + 1}. <a className={('link link_theme_light_third link_pseudo')} href={document.file.url}>{document.name || 'Скачать'}</a>
                      </div>
                    ))}
                  </div>,
                ]}
              </div>

              <div className={cn('inner-r')}>
                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Цель встречи</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{this.meetingInfo.aim}</div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Результат встречи</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{this.meetingInfo.result}</div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Дополнительная информация</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{bid.creator_comment}</div>
              </div>
            </div>
          </div>

          <div className={cn('aside')}>
            <h2 className={cn('aside-header').mix('indent_15')}>Информация о заявке</h2>

            <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>Сервис</div>
            <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>{bid.service.name}</div>

            <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>Статус</div>
            <div className={cn('aside-content').mix(cn('status')).mix('indent_23')}>
              <span className={'p3 p4_theme_dark_second'}>
                { get(bid, 'bid_stage.name') }
              </span>
            </div>

            <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>Дата создания заявки</div>
            <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>
              {moment(bid.created_at).format('DD.MM.YYYY HH:mm')}
            </div>

            <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>Дата обновления заявки</div>
            <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>
              {moment(bid.updated_at).format('DD.MM.YYYY HH:mm')}
            </div>

            {bid.author && [
              <div key="label" className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
                Автор
              </div>,

              <div key="name" className={cn('aside-content')}>
                <div className={cn('aside-content-person')}>
                  <div className={cn('aside-content-person-avatar')}>
                    <div
                      className={cn('aside-content-person-avatar-img')}
                      style={{
                        background: `url(${this.author.photo.for_profile.url}) top center / cover no-repeat`,
                      }}
                    />
                  </div>

                  <div className={cn('aside-content-person-name-position')}>
                    <div className={cn('aside-content-person-name').mix('p1 p1_theme_light_first indent_3')}>{this.author.full_name}</div>
                    <div className={cn('aside-content-person-position').mix('p2 p2_theme_light_second')}>
                      {this.author.position_name}
                    </div>
                  </div>
                </div>
              </div>,
            ]}

            {this.manager && [
              <div key="label" className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
                Исполнитель
              </div>,

              <div key="name" className={cn('aside-content')}>
                <div className={cn('aside-content-person')}>
                  <div className={cn('aside-content-person-avatar')}>
                    <div
                      className={cn('aside-content-person-avatar-img')}
                      style={{
                        background: `url(${this.manager.photo.for_profile.url}) top center / cover no-repeat`,
                      }}
                    />
                  </div>

                  <div className={cn('aside-content-person-name-position')}>
                    <div className={cn('aside-content-person-name').mix('p1 p1_theme_light_first indent_3')}>{this.manager.full_name}</div>
                    <div className={cn('aside-content-person-position').mix('p2 p2_theme_light_second')}>
                      {this.manager.position_name}
                    </div>
                  </div>
                </div>
              </div>,
            ]}

            <Col>
              {renderComment()}
            </Col>
          </div>
        </div>
      </div>
    )
  }

}
