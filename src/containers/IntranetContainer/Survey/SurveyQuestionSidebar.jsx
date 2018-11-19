import React, { Component } from 'react'
import moment from 'moment'
import { Calendar, Checkbox } from 'components-folder/Icon'

const cn = require('bem-cn')('survey-question-sidebar')

if (process.env.BROWSER) {
  require('./survey-question-sidebar.css')
}

export default class SurveyQuestionSidebar extends Component {
  render() {
    const { current } = this.props

    return (
      <div className={cn}>
        <article className={cn('article')}>
          <h2 className={'indent_13'}>Подробнее об опросе</h2>
          {current.symbol &&
            current.symbol.url && (
              <figure className={cn('figure')}>
                <img
                  src={`${current.symbol ? current.symbol.url : '/public/avatar.png'}`}
                  alt={current.name}
                />
              </figure>
            )}

          {/* <div className={cn('block-icon')}>
            <div className={cn('block-icon-text')}>
              <Checkbox className={cn('checkbox-icon')} />
              <span className={cn('text-icon')}>{current.questions_count} вопросов</span>
            </div>
            <div className={cn('block-icon-text')}>
              <Calendar className={cn('calendar-icon')} />
              <span className={cn('text-icon')}>
                <time dateTime="2017-08-15">
                  {current.ends_at && moment(current.ends_at).format('DD MMM YYYY')}
                </time>
              </span>
            </div>
          </div> */}
          <p className={'p1 p1_theme_light_first indent_reset'} dangerouslySetInnerHTML={{ __html: current.note }} />
          {current.document.url && (
            <div className={cn('file-rules')}>
              <a className={'link link_theme_light_third'} href={current.document.url}>
                Правила прохождения опроса
              </a>
            </div>
          )}
        </article>
      </div>
    )
  }
}
