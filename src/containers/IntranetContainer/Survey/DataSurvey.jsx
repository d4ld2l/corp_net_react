import React, { Component } from 'react'
import moment from 'moment'
import { pick } from 'ramda'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { Clock, Check, Calendar, Flag, GroupUser } from 'components-folder/Icon'

const cn = require('bem-cn')('survey-inner')

if (process.env.BROWSER) {
  require('../Survey/survey-inner.css'), require('./data-survey.css')
}

const connector = connect(pick(['surveys']))

class DataSurvey extends Component {
  render() {
    const { surveys: { current } } = this.props

    return (
      <div className={cn}>
        <Row>
          <Col lg={2} lgOffset={1} md={3} mdOffset={1} sm={4}>
            <div className={cn('block-icon-text')}>
              <div className={cn('wrapper-icon')} style={{ background: `#ff2f51` }}>
                <Calendar outline className={cn('calendar-icon')} color={'#fff'} />
              </div>
              <div className={cn('wrapper-info')}>
                <p className={'survey-inner__label'}>Дата публикации</p>
                <p className={'survey-inner__text-icon'}>
                  {current.published_at && (
                    <time dateTime={moment(current.published_at).format('DD.MM.YYYY')}>
                      {moment(current.published_at).format('DD.MM.YYYY')}
                    </time>
                  )}
                </p>
              </div>
            </div>
          </Col>
          {current.ends_at && (
            <Col lg={2} md={3} sm={4}>
              <div className={cn('block-icon-text')}>
                <div className={cn('wrapper-icon')} style={{ background: `#ff2f51` }}>
                  <Clock className={cn('clock-icon')} color={'#fff'} />
                </div>
                <div className={cn('wrapper-info')}>
                  <p className={'survey-inner__label'}>Срок прохождения</p>
                  <p className={'survey-inner__text-icon'}>
                    <time dateTime={moment(current.ends_at).format('DD.MM.YYYY')}>
                      до {moment(current.ends_at).format('DD.MM.YYYY')}
                    </time>
                  </p>
                </div>
              </div>
            </Col>
          )}

          <Col lg={2} md={3} sm={4}>
            <div className={cn('block-icon-text')}>
              <div className={cn('wrapper-icon')} style={{ background: `#ff2f51` }}>
                <Check className={cn('checkbox-icon')} color={'#fff'} />
              </div>
              <div className={cn('wrapper-info')}>
                <p className={'survey-inner__label'}>Количество вопросов</p>
                <p className={'survey-inner__text-icon'}>{current.questions_count}</p>
              </div>
            </div>
          </Col>

          <Col lg={2} lgOffset={0} md={3} mdOffset={1} sm={4}>
            <div className={cn('block-icon-text')}>
              <div className={cn('wrapper-icon')} style={{ background: `#ff2f51` }}>
                <GroupUser className={cn('user-icon')} color={'#fff'} />
              </div>
              <div className={cn('wrapper-info')}>
                <p className={'survey-inner__label'}>Приняли участие</p>
                <p className={'survey-inner__text-icon'}>
                  {current.participants_passed_count} из {current.participants_total_count}
                </p>
              </div>
            </div>
          </Col>

          {current.survey_type && (
            <Col lg={2} md={3} sm={4}>
              <div className={cn('block-icon-text')}>
                <div className={cn('wrapper-icon')} style={{ background: `#ff2f51` }}>
                  <Flag className={cn('flag-icon')} color={'#fff'} />
                </div>
                <div className={cn('wrapper-info')}>
                  <p className={'survey-inner__label'}>Тип опроса</p>
                  <p className={'survey-inner__text-icon'}>
                    {current.survey_type === 'simple' ? 'Опрос' : 'Голосование'}
                  </p>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

export default connector(DataSurvey)
