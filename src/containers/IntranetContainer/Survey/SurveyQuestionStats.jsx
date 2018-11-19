import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { pick } from 'ramda'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'

import { Row, Col, Collapse, Clearfix } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('new-survey-collapse')

if (process.env.BROWSER) {
  require('./new-survey-collapse.css'), require('./question-survey.css')
}

moment.locale('ru')

const connector = connect(state => ({
  survey: state.surveys.current
}))

class SurveyQuestionStats extends PureComponent {
  state = { open: false }

  variants(question) {
    let items = sortBy(question.offered_variants, 'position')

    if (!question.ban_own_answer) {
      return items.concat([{
        wording: 'Свой ответ',
        users_count: question.own_answer_count,
        users_percentage: question.own_answer_percentage
      }])
    }

    return items
  }

  render() {
    const { survey } = this.props
    const { open } = this.state

    return (
      <Row>
        <Col lg={11} lgOffset={1} md={11} mdOffset={1} sm={12} xs={12}>
          <div className={cn.mix('question-survey')} id="question">
            <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
              <h2>Вопросы</h2>

              {open ? (
                <Arrow className={cn('open-icon')} />
              ) : (
                <Arrow className={cn('close-icon')} />
              )}
            </div>

            <Collapse in={this.state.open}>
              <div>
                <div className={cn('body').mix('question-survey__body')}>
                  {survey.questions.map((question, index) => (
                    <article key={index} className={cn('question-result-block')}>
                      <div className={cn('header-question')}>
                        <div className={cn('number-question')}>{index + 1}.</div>
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: question.wording,
                          }}
                        />
                      </div>

                      {question.image && (
                        <div>
                          <img src={question.image.medium.url} />
                        </div>
                      )}

                      {question.question_type === 'multiple' && (
                        <p className={cn('description-question')}>
                          В вопросе возможен выбор нескольких значений
                        </p>
                      )}

                      <div className={cn('wrapper-results')}>
                        {this.variants(question).map((variant, index) => (
                          <div key={index} className={cn('results-survey')}>
                            <div className={cn('variant-question')}>
                              {variant.wording}
                              {variant.image && (
                                <div className={cn('wrapper-logo-question')}>
                                  <div
                                    className={cn('logo-question')}
                                    style={{
                                      background: `url(${variant.image.medium.url}) top left / cover no-repeat`,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className={cn('wrapper-result-line')}>
                              <div
                                className={cn('result-line')}
                                style={{
                                  width: `${Math.round(380 / 100 * variant.users_percentage)}px`,
                                }}
                              />
                            </div>
                            <div className={cn('number-responses')}>
                              {variant.users_count} ({Math.round(variant.users_percentage * 100) / 100}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Collapse>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connector(SurveyQuestionStats)
