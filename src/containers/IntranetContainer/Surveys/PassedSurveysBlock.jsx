import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Check, User, Calendar } from 'components-folder/Icon'

const cn = require('bem-cn')('surveys-block')

if (process.env.BROWSER) {
  require('./surveys-block.css')
}

export default class PassedSurveysBlock extends Component {
  render() {
    const { surveys, isSearch } = this.props

    return (
      <div>
        {surveys.length === 0 && isSearch ? (
          <div>Ничего не найдено</div>
        ) : (
          surveys.map(survey => (
            <div className={cn} key={Math.random()}>
              <article className={cn('article')}>
                <div className={cn('block-img-text')}>
                  {survey.symbol &&
                    survey.symbol.thumb &&
                    survey.symbol.medium.url && (
                      <figure className={cn('figure')}>
                        <Link to={`/surveys/${survey.id}/publication`}>
                          <div
                            className="logo"
                            style={{
                              background: `url(${survey.symbol.medium
                                .url}) center center / cover no-repeat`,
                            }}
                          />
                        </Link>
                      </figure>
                    )}

                  <div className={cn('block-info')}>
                    <Link
                      className={cn('link-start-survey').mix('link link_theme_light_first')}
                      to={`/surveys/${survey.id}/publication`}
                    >
                      <h3>{survey.name}</h3>
                    </Link>
                    <div className={cn('info-message')}>Пройден</div>
                    <div className={cn('block-icon')}>
                      <div className={cn('block-icon-text')}>
                        <Check className={cn('checkbox-icon')} />
                        <span className={'p3 p3_theme_light'}>
                          {survey.questions_count}&nbsp;{survey.questions_count &&
                            (survey.questions_count === 1
                              ? 'вопрос'
                              : survey.questions_count < 5 ? 'вопроса' : 'вопросов')}
                        </span>
                      </div>
                      <div className={cn('block-icon-text')}>
                        <User className={cn('user-icon').mix('is-user')} />
                        <span className={'p3 p3_theme_light'}>
                          {survey.creator.full_name}
                        </span>
                      </div>
                      {survey.published_at && (
                        <div className={cn('block-icon-text')}>
                          <Calendar outline className={cn('calendar-icon')} />
                          <span className={'p3 p3_theme_light'}>
                            <time dateTime="2017-08-15">
                              {moment(survey.published_at).format('DD.MM.YYYY')}
                            </time>
                          </span>
                        </div>
                      )}
                    </div>
                    <p className={'p1 p1_theme_light_first'} dangerouslySetInnerHTML={{ __html: survey.note }} />
                  </div>
                </div>
                {/*<div className={cn('block-btn')}>*/}
                {/*<Link to={`/surveys/${survey.id}`} className="btn btn-primary disabled">Пройти</Link>*/}
                {/*</div>*/}
              </article>
            </div>
          ))
        )}
      </div>
    )
  }
}
