import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import SurveyInnerSidebar from './SurveyInnerSidebar'

import { Clock, Check, Calendar } from 'components-folder/Icon'

const cn = require('bem-cn')('survey-inner')

if (process.env.BROWSER) {
  require('./survey-inner.css')
}

export default class SurveyInner extends Component {
  render() {
    const { current, nextQuestion } = this.props

    const symbolUrl = current.symbol && current.symbol.url

    const question =
      current.questions_count &&
      (current.questions_count === 1
        ? 'вопрос'
        : current.questions_count < 5 ? 'вопроса' : 'вопросов')

    const condition =
      current.background == '#ededed' ||
      current.background == '#ffffff' ||
      current.background == '#fff' ||
      current.background == '' ||
      current.background == null

    return (
      <div className={cn}>
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
          className="survey-inner__wrapper"
        >
          <Row>
            <Col xs={7} className="minus-padding-right">
              <div className={cn('block')}>
                <article className={cn('article')}>
                  { symbolUrl && (
                    <div style={{
                      width: '100%',
                      position: 'relative',
                      display: 'block',
                      marginBottom: '25px',
                      height: '300px',
                      background: `url(${symbolUrl}) top left / contain no-repeat`,
                      // border: `9px solid ${current.background}`,
                    }} />
                  )}

                  <div className={cn('desription')}>
                    <p className={'p1 p1_theme_light_first indent_15'} dangerouslySetInnerHTML={{ __html: current.note }} />
                    <div className={cn('btn-start-b')}>
                      <button className="btn btn-primary" onClick={() => nextQuestion()}>
                        Начать
                      </button>
                      {current.anonymous && (
                        <p className={cn('survey-is-anonymous')}>Опрос анонимный</p>
                      )}
                    </div>
                  </div>

                  {current.document &&
                    current.document.url && (
                      <div className={cn('file-rules')}>
                        <a className={'link link_theme_light_third'} href={current.document.url}>
                          Правила прохождения опроса
                        </a>
                      </div>
                    )}
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
