import React, {Component} from 'react'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { Clock, Check, Calendar } from 'components-folder/Icon'

const cn = require('bem-cn')('survey-inner')

if (process.env.BROWSER) {
  require('containers-folder/IntranetContainer/Survey/survey-inner.css')
}

export default class InfoBar extends Component {
  render() {
    const { assessment } = this.props
    const background = assessment.color;
    const created_at = assessment.updated_at;
    const ends_at = assessment.due_date;
    const questions_count = assessment.skills_count;
    const condition =
      background === '#ededed' ||
      background === '#ffffff' ||
      background === '#fff' ||
      background === '' ||
      background === null

    return (
      <div className={cn}>
        <Row>
        {created_at && (
          <Col lg={2} md={3} sm={3} xs={4}>
            <div className={cn('block-icon-text')}>
              <div
                className={cn('wrapper-icon')}
                style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
              >
                <Calendar outline
                          className={cn('calendar-icon')}
                          color={condition ? '#fff' : background}
                />
              </div>
              <div className={cn('wrapper-info')}>
                <p
                  className={
                    condition
                      ? 'survey-inner__label'
                      : 'survey-inner__label survey-inner__label_color'
                  }
                >
                  Дата публикации
                </p>
                <p
                  className={
                    condition
                      ? 'survey-inner__text-icon'
                      : 'survey-inner__text-icon survey-inner__text-icon_color'
                  }
                >
                  <time dateTime={moment(created_at).format('DD.MM.YYYY')}>
                    {moment(created_at).format('DD.MM.YYYY')}
                  </time>
                </p>
              </div>
            </div>
          </Col>
        )}
        {ends_at && (
          <Col lg={2} md={3} sm={3} xs={4}>
            <div className={cn('block-icon-text')}>
              <div
                className={cn('wrapper-icon')}
                style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
              >
                <Clock
                  className={cn('clock-icon')}
                  color={condition ? '#fff' : background}
                />
              </div>
              <div className={cn('wrapper-info')}>
                <p
                  className={
                    condition
                      ? 'survey-inner__label'
                      : 'survey-inner__label survey-inner__label_color'
                  }
                >
                  Срок прохождения
                </p>
                <p
                  className={
                    condition
                      ? 'survey-inner__text-icon'
                      : 'survey-inner__text-icon survey-inner__text-icon_color'
                  }
                >
                  <time dateTime={moment(ends_at).format('DD.MM.YYYY')}>
                    до {moment(ends_at).format('DD.MM.YYYY')}
                  </time>
                </p>
              </div>
            </div>
          </Col>
        )}
        <Col lg={3} md={3} sm={3} xs={4}>
          <div className={cn('block-icon-text')}>
            <div
              className={cn('wrapper-icon')}
              style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
            >
              <Check
                className={cn('checkbox-icon')}
                color={condition ? '#fff' : background}
              />
            </div>
            <div className={cn('wrapper-info')}>
              <p
                className={
                  condition
                    ? 'survey-inner__label'
                    : 'survey-inner__label survey-inner__label_color'
                }
              >
                Количество компетенций
              </p>
              <p
                className={
                  condition
                    ? 'survey-inner__text-icon'
                    : 'survey-inner__text-icon survey-inner__text-icon_color'
                }
              >
                {questions_count}
              </p>
            </div>
          </div>
        </Col>
      </Row>
      </div>
    )
  }
}
