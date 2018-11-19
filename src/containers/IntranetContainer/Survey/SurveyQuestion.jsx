import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import SurveyQuestionSidebar from './SurveyQuestionSidebar'
import sortBy from 'lodash/sortBy'

const cn = require('bem-cn')('survey-question')

if (process.env.BROWSER) {
  require('./survey-question.css')
}

export default class SurveyQuestion extends Component {
  state = {
    variant: this.props.initialValues.variant || '',
    text: this.props.initialValues.text || '',
  }

  render() {
    const { current, nextQuestion, question, index, saveQuestion } = this.props
    const color = { backgroundColor: current.background }
    const image = {
      width: '100%',
      position: 'relative',
      display: 'block',
      height: question.image_small_medium_url ? '280px' : 'auto',
      background: `url(${question.image_small_medium_url}) left center / contain no-repeat`,
      marginBottom: '20px',
    }
    return (
      <div className={cn}>
        <Row>
          <Col xs={7} xsOffset={1}>
            <Link className={cn('link')} to={'/surveys'}>
              Вернуться к списку опросов
            </Link>

            <article className={cn('article')}>
              <header className={cn('header')} style={color}>
                <p className={cn('header_text')}>
                  {index}&nbsp; из&nbsp;{current.questions_count}
                </p>
              </header>
              <main className={cn('main')}>
                <h2 dangerouslySetInnerHTML={{ __html: question.wording }} />
                {question.image_small_medium_url && <div style={image} title={question.wording} />}
                {sortBy(question.offered_variants, 'position').map((variant, idx) => (
                  <div key={`rad_${Math.random()}`} className="b-radio radio-button">
                    <input
                      name={`${question.id}`}
                      type="radio"
                      className="radio-button__input"
                      value={`${variant.id}`}
                      id={`${question.id}_${idx}`}
                      checked={this.state.variant === `${variant.id}`}
                      onChange={event => this.setState({ variant: event.target.value })}
                    />
                    <label tabIndex={'0'} htmlFor={`${question.id}_${idx}`} className="radio-button__label">
                      {variant.wording}
                    </label>
                  </div>
                ))}
                {!question.ban_own_answer &&
                  sortBy(question.offered_variants, 'position').length > 0 && (
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
                      <label htmlFor={`${question.id}_own_answer`} className="radio-button__label">
                        Свой вариант
                      </label>
                    </div>
                  )}
                {!question.ban_own_answer &&
                  (this.state.variant === 'own_answer' ||
                    sortBy(question.offered_variants, 'position').length === 0) && (
                    <div className="form-group">
                      <label htmlFor={`${question.id}_own_answer_value`}>Ответ</label>
                      <textarea
                        name={`${question.id}_own_answer_value`}
                        id={`${question.id}_own_answer_value`}
                        className="form-control"
                        value={this.state.text}
                        onChange={event => this.setState({ text: event.target.value })}
                      />
                    </div>
                  )}
                <div className={cn('b-answer')}>
                  {index > 1 && (
                    <span className={`btn ${cn('btn-back')}`} onClick={() => nextQuestion(-1)}>
                      Вернуться
                    </span>
                  )}
                  <span
                    className={`btn btn-primary ${!(this.state.variant || this.state.text) &&
                      'disabled'}`}
                    onClick={() => {
                      if (this.state.variant || this.state.text) {
                        saveQuestion(question.id, this.state)
                      }
                    }}
                  >
                    {current.questions_count === index ? 'Завершить' : 'Далее'}
                  </span>
                </div>
              </main>
            </article>
          </Col>
          <Col xs={4}>{/* <SurveyQuestionSidebar current={current} /> */}</Col>
        </Row>
      </div>
    )
  }
}
