import React, { Component } from 'react'
import moment from "moment/moment"
import { Col } from 'react-bootstrap'
import { Arrow } from 'components-folder/Icon'
import ClickOutside from 'components-folder/ClickOutside'
import get from 'lodash/get'

const cn = require('bem-cn')('intranet-bid')

const byod_type = {
  buy_out: 'Выкуп ноутбука из helpDesk',
  new_device: 'Покупка нового ноутбука',
}


export default class Byod extends Component {

  render() {
    const { bid, user, renderComment, toggleActions, onCloseActions, onChangeState, onEdit, actions } = this.props
    return (
      <div>
        <h1 className={cn('title')}>
          Заявка {bid.id}{' '}

          <div className={cn('bid-actions-buttons')}>
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

                          {bid.stage !== 'Отклонена' &&
                          bid.stage !== 'Исполнена' && (
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

        <div className={cn('container')}>
          <div className={cn('main')}>
            <div className={cn('inner')}>
              <div className={cn('inner-l')}>
                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Тип Заявки</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {byod_type[bid.byod_information.byod_type]}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>ФИО Сотрудника</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {bid.creator.full_name ? (
                      <div
                        style={{
                          background: `url(${bid.creator.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />
                    ) : (
                      ''
                    )}
                    <section>
                      <span className={'indent_3'}>{bid.creator.full_name}</span>
                      <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>{bid.creator_position}</div>
                    </section>
                  </section>
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Юридическое лицо</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {bid.legal_unit && bid.legal_unit.name}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Код проекта</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {bid.byod_information && bid.byod_information.project && bid.byod_information.project.charge_code}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Согласующий</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {bid.matching_user.full_name ? (
                      <div
                        style={{
                          background: `url(${bid.matching_user.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />
                    ) : (
                      ''
                    )}

                    <section>
                      <span>{bid.matching_user.full_name}</span>
                      <div className={cn('participant-position')}>
                        {bid.matching_user.position_name}
                      </div>
                    </section>
                  </section>
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Ассистент</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  <section className={cn('wrapper-data')}>
                    {bid.assistant && bid.assistant.full_name ? (
                      <div
                        style={{
                          background: `url(${bid.assistant.photo.url}) center center / cover no-repeat`,
                        }}
                        className={cn('participant-photo')({ margin: 'left' })}
                      />
                    ) : (
                      ''
                    )}

                    <section>
                      <span className={'indent_3'}>{bid.assistant && bid.assistant.full_name}</span>
                      <div className={cn('participant-position').mix('p2 p2_theme_light_second')}>
                        {bid.assistant && bid.assistant.position_name}
                      </div>
                    </section>
                  </section>
                </div>
              </div>

              <div className={cn('inner-r')}>
                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Модель ноутбука</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{bid.byod_information.device_model}</div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Инвентаризационный номер</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {bid.byod_information.device_inventory_number}
                </div>

                <div className={cn('inner-label').mix('p3 p3_theme_light')}>Сумма компенсаций</div>
                <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                  {bid.byod_information.compensation_amount} руб.
                </div>

                {bid.byod_information.documents &&
                bid.byod_information.documents.length > 0 && [
                  <div key={'label'} className={cn('inner-label').mix('p3 p3_theme_light')}>
                    Документы
                  </div>,

                  <div key={'content'} className={cn('inner-content').mix('p1 p1_theme_light_first')}>
                    {bid.byod_information.documents.map((document, index) => (
                      <div key={index}>
                        {index + 1}. <a href={document.file.url}>{document.name}</a>
                      </div>
                    ))}
                  </div>,
                ]}

                <div>
                  <div className={cn('inner-label').mix('p3 p3_theme_light')}>Дополнительная информация</div>
                  <div className={cn('inner-content').mix('p1 p1_theme_light_first')}>{bid.creator_comment}</div>
                </div>
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
                        background: `url(${bid.author.photo.url}) top center / cover no-repeat`,
                      }}
                    />
                  </div>

                  <div className={cn('aside-content-person-name-position')}>
                    <div className={cn('aside-content-person-name').mix('p1 p1_theme_light_first indent_3')}>{bid.author.full_name}</div>
                    <div className={cn('aside-content-person-position').mix('p2 p2_theme_light_second')}>
                      {bid.author.position_name}
                    </div>
                  </div>
                </div>
              </div>,
            ]}

            {bid.manager && [
              <div key="label" className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
                Текущий Исполнитель
              </div>,

              <div key="name" className={cn('aside-content')}>
                <div className={cn('aside-content-person')}>
                  <div className={cn('aside-content-person-avatar')}>
                    <div
                      className={cn('aside-content-person-avatar-img')}
                      style={{
                        background: `url(${bid.manager.photo &&
                        bid.manager.photo.url}) top center / cover no-repeat`,
                      }}
                    />
                  </div>

                  <div className={cn('aside-content-person-name-position')}>
                    <div className={cn('aside-content-person-name').mix('p1 p1_theme_light_first indent_3')}>{bid.manager.full_name}</div>
                    <div className={cn('aside-content-person-position').mix('p2 p2_theme_light_second')}>
                      {bid.manager.position_name}
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
