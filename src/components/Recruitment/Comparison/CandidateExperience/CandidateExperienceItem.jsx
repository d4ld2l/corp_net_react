import React, { Component } from 'react'
import moment from 'moment'

import { cn, formatDateDiff } from '../common'

export default class CandidateExperienceItem extends Component {
  render() {
    const {
      start_date,
      end_date,
      position,
      company_name,
      website,
      region,
      experience_description,
    } = this.props
    return (
      <li className={cn('wrapper-experience')} key={Math.random()}>
        {start_date && (
          <div className={cn('time-interval')}>
            <p className={cn('chronological-list-head')}>
              {moment(start_date).format('DD.MM.YYYY')} - <br />
              {end_date ? moment(end_date).format('DD.MM.YYYY') : 'по наст. вр.'}
            </p>
            <span className={cn('seniority')}>
              {end_date
                ? formatDateDiff( Math.floor( Math.abs(moment(start_date).diff(moment(end_date || Date.now()), 'months'))))
                : moment(start_date, 'YYYYMMDD').fromNow()}
            </span>
          </div>
        )}
        <article className={cn('chronological-article')}>
          <div className={cn('chronological-hgroup')}>
            <h4 className={cn('chronological-title')}>{position}</h4>
            {company_name && (
              <p className={cn('chronological-company')}>
                {company_name}
                {website ? <span>,&nbsp;</span> : ''}
              </p>
            )}
            {website && (
              <a className={cn('chronological-company-link')} href={website}>
                {website}
              </a>
            )}
            {region && <p className={cn('chronological-city')}>{region}</p>}
          </div>
          <main>
            <p
              className={cn('chronological-text')}
              dangerouslySetInnerHTML={{ __html: experience_description }}
            />
          </main>
        </article>
      </li>
    )
  }
}