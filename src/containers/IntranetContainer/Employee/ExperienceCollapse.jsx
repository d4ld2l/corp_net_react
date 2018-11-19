import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Collapse } from 'react-bootstrap'

import { Arrow } from 'components-folder/Icon'

const cn = require('bem-cn')('employee-resume-tabs')

if (process.env.BROWSER) {
  require('./employee-resume-tabs.css')
}
moment.locale('ru')

const connector = connect(
  state => ({
    current: state.employees.current,
    employees: state.employees.data,
  }),
  {}
)

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

class StatusesCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  render() {
    const { open } = this.state
    const { current } = this.props
    return (
      <div>
        <div className={cn} id="experience">
          <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
            <h2 className="indent-reset">
              Опыт работы — {current.resumes[0] && workExperiens(current.resumes[0].summary_work_period)}
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
                {current.resumes[0] && current.resumes[0].resume_work_experiences.length > 0 && (
                  <Col className={cn('chronological-list')}>
                    {current.resumes[0].resume_work_experiences.reverse().map((exp, it) => (
                      <ExperienceCard key={`${it}${exp.id}`} exp={exp}/>
                    ))}
                  </Col>
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
  <div className={cn('wrapper-experience')} key={exp.id}>
    {exp.start_date && (
      <div className={cn('time-interval')}>
        <p className={cn('chronological-list-head').mix('p1 p1_theme_light_first indent_reset')}>
          {moment(exp.start_date).format('MM.YYYY')} - <br />
          {exp.end_date
            ? moment(exp.end_date).format('MM.YYYY')
            : 'по наст. вр.'}
        </p>
        <span className={cn('seniority').mix('p2 p2_theme_light_second')}>
          {workExperiens( Math.floor( Math.abs(moment(exp.start_date).date(1).diff(moment(exp.end_date || Date.now()).add(1, 'M').date(1), 'months'))))}
        </span>
      </div>
    )}
    <article className={cn('chronological-article')}>
      <hgroup className={cn('chronological-hgroup')}>
        <h4 className={cn('chronological-title').mix('fw_500 indent_reset')}>{exp.position}</h4>
        {exp.company_name && (
          <p className={cn('chronological-company').mix('p2 p2_theme_light_second indent_reset')}>
            {exp.company_name}
            {exp.website ? <span>,&nbsp;</span> : ''}
          </p>
        )}
        {exp.website && (
          <a className={cn('chronological-company-link').mix('p2 link link_theme_light_second indent_reset')} href={exp.website} target="_blank">
            {exp.website}
          </a>
        )}
        {exp.region && <p className={cn('chronological-city').mix('p2 p2_theme_light_second indent_reset')}>{exp.region}</p>}
      </hgroup>
      {exp.experience_description && (
        <main>
          <p1 className={('p1 p1_theme_light_first')}>Основные обязанности:</p1>
          <div
            className={cn('chronological-text').mix('p1 p1_theme_light_first')}
            dangerouslySetInnerHTML={{ __html: exp.experience_description }}
          />
        </main>)}
    </article>
  </div>
)
export default connector(StatusesCollapse)
