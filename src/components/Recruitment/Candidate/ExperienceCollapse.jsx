import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Arrow } from 'components-folder/Icon'
import { get, reverse, sortBy } from 'lodash'

const cn = require('bem-cn')('candidate-resume-tabs')

if (process.env.BROWSER) {
  require('./candidate-resume-tabs.css')
}

function workExperiens(period) {
  const years = Math.floor(period / 12)
  const months = period - years * 12
  const wordYears =
    years > 0
      ? years === 1 || (years > 20 && years % 10 === 1) ? 'год' : years < 5 ? 'года' : 'лет'
      : ''
  const wordMonths =
    months > 0 ? (months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев') : ''
  return `${years > 0 ? years : ''} ${wordYears} ${months > 0 ? months : ''} ${wordMonths}`
}

export default class ExperienceCollapse extends Component {
  state = {
    open: true,
  }

  render() {
    const { open } = this.state
    const { resume } = this.props

    return (
      <div>
        <div id="experience">
          <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
            <h2 className="indent-reset">
              Опыт работы — {workExperiens(resume.summary_work_period)}
            </h2>

            {open ? (
              <Arrow className={cn('arrow-icon_open')} />
            ) : (
              <Arrow className={cn('arrow-icon_close')} />
            )}
          </div>
          <Collapse in={this.state.open}>
            <div>
              <div className={cn('body')}>
                {resume.resume_work_experiences.length > 0 && (
                  <ul className={cn('chronological-list')}>
                    {reverse(
                      sortBy(
                        get(resume, 'resume_work_experiences', []),
                        ['end_date', 'start_day']
                      )
                    ).map((exp, it) => (
                      <ExperienceCard key={`${it}${exp.id}`} exp={exp}/>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

const ExperienceCard = ({ exp }) => (
  <li className={cn('wrapper-experience')} key={exp.id}>
    {exp.start_date && (
      <div className={cn('time-interval')}>
        <p className={cn('chronological-list-head')}>
          {moment(exp.start_date).format('DD.MM.YYYY')} - <br />
          {exp.end_date
            ? moment(exp.end_date).format('DD.MM.YYYY')
            : 'по наст. вр.'}
        </p>
        <span className={cn('seniority')}>
          {workExperiens( Math.floor( Math.abs(moment(exp.start_date).diff(moment(exp.end_date || Date.now()), 'months'))))}
        </span>
      </div>
    )}
    <article className={cn('chronological-article')}>
      <hgroup className={cn('chronological-hgroup')}>
        <h4 className={cn('chronological-title')}>{exp.position}</h4>
        {exp.company_name && (
          <p className={cn('chronological-company')}>
            {exp.company_name}
            {exp.website ? <span>,&nbsp;</span> : ''}
          </p>
        )}
        {exp.website && (
          <a className={cn('chronological-company-link')} href={exp.website}>
            {exp.website}
          </a>
        )}
        {exp.region && <p className={cn('chronological-city')}>{exp.region}</p>}
      </hgroup>
      <main>
        <p
          className={cn('chronological-text')}
          dangerouslySetInnerHTML={{ __html: exp.experience_description }}
        />
      </main>
    </article>
  </li>
)

