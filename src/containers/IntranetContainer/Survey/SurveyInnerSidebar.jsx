import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Check, Calendar } from 'components-folder/Icon'

const cn = require('bem-cn')('survey-inner-sidebar')

if (process.env.BROWSER) {
  require('./survey-inner-sidebar.css')
}

const connector = connect(
  state => ({
    current: state.surveys.current,
    surveys: state.surveys.data,
  }),
  {}
)

class SurveyInner extends Component {
  render() {
    const { surveys, current } = this.props
    const question =
      current.questions_count &&
      (current.questions_count === 1
        ? 'вопрос'
        : current.questions_count < 5 ? 'вопроса' : 'вопросов')

    return null

    return (
      <div className={cn}>
        <h2>Другие опросы</h2>
        {surveys &&
          surveys.filter(survey => survey.id !== current.id).map(
            (survey, idx) =>
              idx < 2 && (
                <article className={cn('article')} key={survey.id}>
                  {survey.symbol &&
                    survey.symbol.url && (
                      <figure className={cn('figure')}>
                        <img
                          src={`${survey.symbol ? survey.symbol.url : '/public/avatar.png'}`}
                          alt={survey.name}
                        />
                      </figure>
                    )}
                  <div className={cn('right-b')}>
                    <h4>{survey.name}</h4>
                    <div className={cn('block-icon')}>
                      <div className={cn('block-icon-text')}>
                        <Check className={cn('checkbox-icon')} />
                        <span className={cn('text-icon')}>
                          {survey.questions_count}&nbsp;{question}
                        </span>
                      </div>
                      {survey.created_at && (
                        <div className={cn('block-icon-text')}>
                          <Calendar outline className={cn('calendar-icon')} />
                          <span className={cn('text-icon')}>
                            <time dateTime="2017-08-15">
                              {moment(survey.created_at).format('DD MMM YYYY')}
                            </time>
                          </span>
                        </div>
                      )}
                    </div>
                    <Link className={cn('link')} to={`/surveys/${survey.id}`}>
                      Подробнее
                    </Link>
                  </div>
                </article>
              )
          )}
        <div className={cn('wrapper-all')}>
          <Link to={`/surveys`} className="btn btn-outline">
            Посмотреть все
          </Link>
        </div>
      </div>
    )
  }
}

export default connector(SurveyInner)
