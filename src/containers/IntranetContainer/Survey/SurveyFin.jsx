import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Row, Col } from 'react-bootstrap'
import SurveyInnerSidebar from './SurveyInnerSidebar'
import { Clock, Check, Calendar } from 'components-folder/Icon'
import moment from 'moment'

const cn = require('bem-cn')('survey-fin')

if (process.env.BROWSER) {
  require('./survey-fin.css')
}

const COLORS = [
  '#2b2d4b',
  '#575B97',
  '#1D1F33',
  '#CC2641',
  '#ff7b91',
  '#ff2f51',
  '#158cdf',
  '#5aabe4',
  '#8365DF',
  '#f9bb0e',
  '#1fc58f',
]

const connector = connect()

class SurveyInner extends Component {
  onAllSurveysClick = () => {
    this.props.dispatch(push('/surveys'))
  }

  render() {
    const { current, result } = this.props

    const image = {
      width: '100%',
      position: 'relative',
      display: 'block',
      margin: '15px 0 15px',
      height: current.symbol && current.symbol.url ? '310px' : 'auto',
      background: `url(${current.symbol && current.symbol.url}) top left / contain no-repeat`,
    }
    const condition =
      current.background == '#ededed' ||
      current.background == '#ffffff' ||
      current.background == '#fff' ||
      current.background == '' ||
      current.background == null
    let keys = []
    let statistics = {}
    if (current.survey_type === 'Сложный') {
      keys = Object.keys(result.statistics ? result.statistics : current.statistics)
      statistics = result.statistics ? result.statistics : current.statistics
    }

    return (
      <div className={cn}>
        {/* <Link className={cn('link')} to={'/surveys'}>
          Вернуться к списку опросов
        </Link> */}
        <Row>
          {current.created_at && (
            <Col lg={2} lgOffset={1} md={3} mdOffset={1} sm={3} xs={4}>
              <div className={cn('block-icon-text')}>
                <div
                  className={cn('wrapper-icon')}
                  style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
                >
                  <Calendar outline
                    className={cn('calendar-icon')}
                    color={condition ? '#fff' : current.background}
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
                    <time dateTime={moment(current.created_at).format('DD.MM.YYYY')}>
                      {moment(current.created_at).format('DD.MM.YYYY')}
                    </time>
                  </p>
                </div>
              </div>
            </Col>
          )}
          {current.ends_at && (
            <Col lg={2} md={3} sm={3} xs={4}>
              <div className={cn('block-icon-text')}>
                <div
                  className={cn('wrapper-icon')}
                  style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
                >
                  <Clock
                    className={cn('clock-icon')}
                    color={condition ? '#fff' : current.background}
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
                    <time dateTime={moment(current.ends_at).format('DD.MM.YYYY')}>
                      до {moment(current.ends_at).format('DD.MM.YYYY')}
                    </time>
                  </p>
                </div>
              </div>
            </Col>
          )}
          <Col lg={2} md={3} sm={3} xs={4}>
            <div className={cn('block-icon-text')}>
              <div
                className={cn('wrapper-icon')}
                style={condition ? { background: `#ff2f51` } : { background: `#fff` }}
              >
                <Check
                  className={cn('checkbox-icon')}
                  color={condition ? '#fff' : current.background}
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
                  Количество вопросов
                </p>
                <p
                  className={
                    condition
                      ? 'survey-inner__text-icon'
                      : 'survey-inner__text-icon survey-inner__text-icon_color'
                  }
                >
                  {current.questions_count}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Col
          lg={11}
          lgOffset={1}
          md={11}
          mdOffset={1}
          sm={12}
          xs={12}
          className="survey-fin__wrapper"
        >
          <Row>
            <Col xs={7} className="minus-padding-right">
              <div className={cn('block')}>
                <article className={cn('article')}>
                  <h3 className={cn('header_text')}>Результаты опроса</h3>
                  <h4>Спасибо за участие)</h4>
                  <div style={image} />
                  <div className={cn('desription')}>
                    <p className={'p1 p1_theme_light_first indent_15'} dangerouslySetInnerHTML={{ __html: current.note }} />
                  </div>
                  {current.survey_type === 'Сложный' && (
                    <div className={cn('statistics')}>
                      {keys.map(item => {
                        return (
                          <div key={item} className={cn('statistics-item')}>
                            <span
                              className={cn('statistics-fill')}
                              style={{
                                width: `${Math.round(3.7 * statistics[item])}px`,
                                backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                              }}
                            />&nbsp;{statistics[item]}%
                            <span className={cn('statistics-answer')}>{item}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  <div onClick={this.onAllSurveysClick} className="btn btn-outline">
                    Все опросы
                  </div>
                </article>
              </div>
            </Col>
            <Col xs={5}>
              <SurveyInnerSidebar />
            </Col>
          </Row>
        </Col>
      </div>
    )
  }
}

export default connector(SurveyInner)
