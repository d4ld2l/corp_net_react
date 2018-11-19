import React, { Component } from 'react';
import moment from 'moment/moment';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { get, isEmpty} from 'lodash';

const cn = require('bem-cn')('intranet-bid');

export default class GeneralTeamBuilding extends Component {

  formatSalary(salary) {
    return salary && salary.toFixed().replace(/(\d)(?=(\d{3})+(␣|$))/g, '$1 ')
  }

  render() {
    const { bid, renderComment } = this.props;

    return (
      <div className={cn('container')} style={{ marginTop: '10px' }}>
        <div className={cn('main')}>
          <div className={cn('inner')}>
            <div className={cn('inner-l')}>
              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Тип Заявки
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {bid.service && bid.service.name}
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Ассистент
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                <section className={cn('wrapper-data')}>
                  {bid.assistant.full_name ? (
                    <div
                      style={{
                        background: `url(${
                          bid.assistant.photo.url
                          }) center center / cover no-repeat`
                      }}
                      className={cn('participant-photo')({ margin: 'left' })}
                    />
                  ) : (
                    ''
                  )}
                  <section>
                    <Link
                      to={`/employees/${bid.assistant.id}`}
                      className={'indent_3 link link_theme_light_first'}
                      title={'Перейти в профиль'}
                    >
                      {bid.assistant.full_name}
                    </Link>
                    <div
                      className={cn('participant-position').mix(
                        'p2 p2_theme_light_second'
                      )}
                    >
                      { get(bid, 'assistant.position_name', 'должность не указана') }
                    </div>
                  </section>
                </section>
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Юридические лица
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {
                  !isEmpty(bid.team_building_information.team_building_information_legal_units) ?
                  (
                    bid.team_building_information.team_building_information_legal_units.map( it =>
                      (
                        <div>
                          {it.legal_unit.name}
                          <br/>
                        </div>
                      )
                    )
                  ) : 'Не указаны'
                }
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Код проекта
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                { get(bid, 'team_building_information.project.charge_code', 'не указан') }
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Дата проведения
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {moment(bid.team_building_information.event_date).format(
                  'DD.MM.YYYY'
                )}
              </div>
            </div>

            <div className={cn('inner-r')}>
              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                город
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {bid.team_building_information.city === null
                  ? 'Не указан'
                  : bid.team_building_information.city}
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Формат проведения
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                { get(bid, 'team_building_information.event_format', 'Не указан') }
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Количество участников
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {bid.team_building_information.number_of_participants}
              </div>

              <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                Примерная Сумма
              </div>
              <div
                className={cn('inner-content').mix('p1 p1_theme_light_first')}
              >
                {this.formatSalary(bid.team_building_information.approx_cost)} руб.
              </div>

              <div>
                <div className={cn('inner-label').mix('p3 p3_theme_light')}>
                  Дополнительная информация
                </div>
                <div
                  className={cn('inner-content').mix('p1 p1_theme_light_first')}
                >
                  { get(bid, 'team_building_information.additional_info', 'Не указана') }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cn('aside')}>
          <h2 className={cn('aside-header').mix('indent_15')}>
            Информация о заявке
          </h2>

          <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
            Сервис
          </div>
          <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>
            {bid.service.name}
          </div>

          <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
            Статус
          </div>
          <div
            className={cn('aside-content')
              .mix(cn('status'))
              .mix('indent_23')}
          >
            <span className={'p3 p4_theme_dark_second'}>
              {get(bid, 'bid_stage.name')}
            </span>
          </div>

          <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
            Дата создания заявки
          </div>
          <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>
            {moment(bid.created_at).format('DD.MM.YYYY HH:mm')}
          </div>

          <div className={cn('aside-label').mix('p3 p3_theme_light indent_5')}>
            Дата обновления заявки
          </div>
          <div className={cn('aside-content').mix('p1 p1_theme_light_first')}>
            {moment(bid.updated_at).format('DD.MM.YYYY HH:mm')}
          </div>

          {bid.creator && [
            <div
              key="label"
              className={cn('aside-label').mix('p3 p3_theme_light indent_5')}
            >
              Автор
            </div>,

            <div key="name" className={cn('aside-content')}>
              <div className={cn('aside-content-person')}>
                <div className={cn('aside-content-person-avatar')}>
                  <div
                    className={cn('aside-content-person-avatar-img')}
                    style={{
                      background: `url(${
                        bid.creator.photo.url
                        }) top center / cover no-repeat`
                    }}
                  />
                </div>

                <div className={cn('aside-content-person-name-position')}>
                  <Link
                    to={`/employees/${bid.creator.id}`}
                    className={cn('aside-content-person-name').mix(
                      'link link_theme_light_first indent_3'
                    )}
                    title={'Перейти в профиль'}
                  >
                    {bid.creator.full_name}
                  </Link>
                  <div
                    className={cn('aside-content-person-position').mix(
                      'p2 p2_theme_light_second'
                    )}
                  >
                    { get(bid, 'creator.position_name', 'должность не указана') }
                  </div>
                </div>
              </div>
            </div>
          ]}

          {bid.assistant && [
            <div
              key="label"
              className={cn('aside-label').mix('p3 p3_theme_light indent_5')}
            >
              Текущий Исполнитель
            </div>,

            <div key="name" className={cn('aside-content')}>
              <div className={cn('aside-content-person')}>
                <div className={cn('aside-content-person-avatar')}>
                  <div
                    className={cn('aside-content-person-avatar-img')}
                    style={{
                      background: `url(${bid.manager.photo &&
                      bid.manager.photo.url}) top center / cover no-repeat`
                    }}
                  />
                </div>

                <div className={cn('aside-content-person-name-position')}>
                  <Link
                    to={`/employees/${bid.manager.id}`}
                    className={cn('aside-content-person-name').mix(
                      'link link_theme_light_first indent_3'
                    )}
                    title={'Перейти в профиль'}
                  >
                    {bid.manager.full_name}
                  </Link>
                  <div
                    className={cn('aside-content-person-position').mix(
                      'p2 p2_theme_light_second'
                    )}
                  >
                    { get(bid, 'manager.position_name', 'должность не указана') }
                  </div>
                </div>
              </div>
            </div>
          ]}

          <Col>{renderComment()}</Col>
        </div>
      </div>
    );
  }
}
