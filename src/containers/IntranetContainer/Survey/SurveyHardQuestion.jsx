import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import SurveyQuestionSidebar from './SurveyQuestionSidebar'
import moment from 'moment'
import { Clock, Check, Calendar, Attention } from 'components-folder/Icon'
import {push} from "react-router-redux";
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('survey-question')

if (process.env.BROWSER) {
  require('./survey-question.css')
}

export default class SurveyHardQuestion extends Component {
  state = {
    variant: this.props.initialValues.variant || '',
    text: this.props.initialValues.text || '',
    text_error: false,
  }

  validateQuestion = () => {
    if (this.state.variant) {
      if ( (typeof this.state.variant === 'string') ? this.state.variant === 'own_answer' : this.state.variant.indexOf('own_answer') >= 0) {
        if (this.state.text === '') {
          this.setState({ text_error: true })
          return false
        } else {
          this.setState({ text_error: false })
          return true
        }
      } else {
        this.setState({ text_error: false })
        return true
      }
    } else {
      this.setState({ text_error: false })
      return false
    }
  }
  render() {
    const { current, nextQuestion, question, index, saveQuestion } = this.props
    const color = { backgroundColor: current.background }
    const image = {
      width: '100%',
      position: 'relative',
      display: 'block',
      height: question.image.url ? '280px' : 'auto',
      background: `url(${question.image.url}) left center / contain no-repeat`,
      marginBottom: '20px',
    }
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
          className="survey-question__wrapper"
        >
          <Row>
            <Col xs={7} className="minus-padding-right">
              {/* <Link className={cn('link')} to={'/surveys'}>
                Вернуться к списку опросов
              </Link> */}

              <article className={cn('article')}>
                <div className={cn('main')}>
                  <h3 dangerouslySetInnerHTML={{ __html: question.wording }} />
                  <p className={cn('question_count')}>
                    {index}&nbsp;из&nbsp;{current.questions_count}
                  </p>
                  {question.image.url && <div style={image} title={question.wording} />}
                  {/* TODO: implement multiple variants */}
                  {question.question_type === 'single' ? (
                    <section>
                      {sortBy(question.offered_variants, 'position').map((variant, idx) => (
                        <div key={`rad_${Math.random()}`} className="b-radio radio-button">
                          <input
                            name={`${question.id}`}
                            type="radio"
                            className="radio-button__input"
                            value={`${variant.id}`}
                            id={`${question.id}_${idx}`}
                            checked={this.state.variant === `${variant.id}`}
                            onChange={event => this.setState({ variant: event.target.value, text_error: false })}
                          />
                          <label tabIndex={'0'} htmlFor={`${question.id}_${idx}`} className="radio-button__label">
                            {variant.wording}
                            {variant.image.url ? (
                              <div
                                className={cn('image-answer')}
                                style={{
                                  background: `url(${variant.image
                                    .url}) center center / cover no-repeat`,
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </label>
                        </div>
                      ))}
                    </section>
                  ) : (
                    <section>
                      {sortBy(question.offered_variants, 'position').map((variant, idx) => (
                        <div key={`check_${Math.random()}`} className="b-radio checkbox-button">
                          <input
                            name={`${question.id}`}
                            type="checkbox"
                            className="checkbox-button__input"
                            value={`${variant.id}`}
                            id={`${question.id}_${idx}`}
                            checked={this.state.variant.indexOf(`${variant.id}`) >= 0}
                            onChange={event => {
                              const index = this.state.variant.indexOf(`${variant.id}`)
                              if (index < 0) {
                                if(event.target.checked) {
                                  this.setState({variant: [...this.state.variant, event.target.value]})
                                }
                              } else {
                                if(!event.target.checked) {
                                  const copy = [...this.state.variant];
                                  copy.splice(index, 1);
                                  this.setState({ variant: copy })
                                }
                              }
                            }
                            }
                          />
                          <label
                            tabIndex={'0'}
                            htmlFor={`${question.id}_${idx}`}
                            className="checkbox-button__label"
                          >
                            {variant.wording}
                            {variant.image.url ? (
                              <div
                                className={cn('image-answer')}
                                style={{
                                  background: `url(${variant.image
                                    .url}) center center / cover no-repeat`,
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </label>
                        </div>
                      ))}
                    </section>
                  )}
                  {question.ban_own_answer == false ? (
                    <section>
                      {/* TODO */}
                      {question.question_type === 'single' ? (
                        <div key={'own_answer'} className="b-radio radio-button">
                          <input
                            name={`${question.id}`}
                            type="radio"
                            className="radio-button__input"
                            value="own_answer"
                            id={`${question.id}_own_answer`}
                            checked={this.state.variant === 'own_answer'}
                            onChange={event => this.setState({ variant: event.target.value })}
                          />
                          <label
                            tabIndex={'0'}
                            htmlFor={`${question.id}_own_answer`}
                            className="radio-button__label"
                          >
                            Свой вариант
                          </label>
                          <div className="form-group position-textarea">
                            <label htmlFor={`${question.id}_own_answer_value`} className={`${this.state.text_error ? 'form-group__label_error' : ''}`}>Ответ</label>
                            <textarea
                              name={`${question.id}_own_answer_value`}
                              id={`${question.id}_own_answer_value`}
                              className="form-control"
                              value={this.state.text}
                              onChange={event => {
                                this.setState({ text: event.target.value, text_error: event.target.value === '' ? true : false })
                              }}
                            />
                            { this.state.text_error ? (
                              <span className="form-group__error">Поле не может быть пустым</span>
                            ) : ('')
                            }
                          </div>
                        </div>
                      ) : (
                        <div key={'own_answer'} className="b-radio checkbox-button">
                          <input
                            name={`${question.id}`}
                            type="checkbox"
                            className="checkbox-button__input"
                            value="own_answer"
                            id={`${question.id}_own_answer`}
                            checked={this.state.variant.indexOf('own_answer') >= 0}
                            onChange={event => {
                              const index = this.state.variant.indexOf('own_answer')
                              if (index < 0) {
                                if(event.target.checked) {
                                  this.setState({variant: [...this.state.variant, 'own_answer']})
                                }
                              } else {
                                if(!event.target.checked) {
                                  const copy = [...this.state.variant];
                                  copy.splice(index, 1);
                                  this.setState({ variant: copy, text_error: false })
                                }
                              }
                            }
                            }
                          />
                          <label
                            tabIndex={'0'}
                            htmlFor={`${question.id}_own_answer`}
                            className="checkbox-button__label"
                          >
                            Свой вариант
                          </label>
                          <div className="form-group position-textarea">
                            <label htmlFor={`${question.id}_own_answer_value`} className={`${this.state.text_error ? 'form-group__label_error' : ''}`}>Ответ</label>
                            <textarea
                              name={`${question.id}_own_answer_value`}
                              id={`${question.id}_own_answer_value`}
                              className="form-control"
                              value={this.state.text}
                              onChange={event => {
                                this.setState({ text: event.target.value, text_error: event.target.value === '' ? true : false})
                              }}
                            />
                            { this.state.text_error ? (
                              <span className="form-group__error">Поле не может быть пустым</span>
                            ) : ('')
                            }
                          </div>
                        </div>
                      )}
                    </section>
                  ) : (
                    ''
                  )}
                  <div className={cn('b-answer')}>
                    <span
                      className={`btn btn-outline ${cn('btn-back')}`}
                      onClick={() => nextQuestion(-1)}
                    >
                      Вернуться
                    </span>
                    <span
                      className={`btn btn-primary ${cn('btn-forward')} ${!(this.state.variant || this.state.text) &&
                        'disabled'}`}
                      onClick={() => {
                        if (this.validateQuestion()) {
                          saveQuestion(question.id, this.state)
                        }
                      }}
                    >
                      {current.questions_count === index ? 'Завершить' : 'Далее'}
                    </span>
                  </div>
                </div>
              </article>
            </Col>
            <Col xs={5}>
              <SurveyQuestionSidebar current={current} />
            </Col>
          </Row>
        </Col>
      </div>
    )
  }
}
