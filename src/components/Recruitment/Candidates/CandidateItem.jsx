import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, Phone, Skype, Post } from '../../Icon'
import Checkbox from '../../Checkbox/Checkbox'
import moment from 'moment/moment'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

const cn = require('bem-cn')('candidates-list')

if (process.env.BROWSER) {
  require('./CandidatesList.css')
}

export default class CandidateItem extends Component {

  contactIcon = contact => {
    if (!contact) return ''
    switch (contact.contact_type) {
      case 'skype':
        return <Skype className={cn('candidate-address-icon')}/>
      case 'email':
        return <Post className={cn('candidate-address-icon')}/>
      case 'phone':
        return <Phone className={cn('candidate-address-icon')}/>
      default:
        return ''
    }
  }

  setCandidate(candidateId) {
    this.props.setCandidate(candidateId)
  }

  render() {
    const { checked, candidate, candidateId, onClick, show, ownerId } = this.props
    return (
      <div
        className={cn('candidate').mix(candidateId === candidate.id && show && 'active')}>
        <Checkbox
          onClick={this.setCandidate.bind(this, candidate.id)}
          checked={checked}
        />
        <div className={cn('candidate-container').mix('cur')}
             onClick={() => onClick({ candidateId: candidate.id, show: true })}
        >
          <div
            className={cn('candidate-block')}
          >
            <div className={cn('candidate-avatar')}
                 style={{
                   backgroundImage: `url(${get(candidate, 'resume.photo.url') || '/public/avatar.svg'})`
                 }} >
            </div>

            <div className={cn('candidate-info')}>
              <Link to={`/recruitment/candidates/${candidate.id}`}
                    className={cn('candidate-name').mix('link link_theme_light_first')}>
                {`${candidate.first_name} ${candidate.middle_name || ''} ${candidate.last_name}`}
              </Link>

              <span className={cn('candidate-role').mix('p2 p2_theme_light_second')}>
              {candidate.resume && candidate.resume.position}
            </span>
            </div>
          </div>
          {!show && (
            <div className={cn('candidate-address').mix('p1 p1_theme_light_first')}>
              { this.contactIcon(get(candidate, 'resume.preferred_contact')) }
              { get(candidate, 'resume.preferred_contact.value') }
            </div>
          )}
          {!show && (
            <div className={cn('candidate-city').mix('p1 p1_theme_light_first')}>
              {candidate.resume && candidate.resume.city}
            </div>)}
          {!show && (
            <div className={cn('candidate-status-block')}>
              { candidate.last_action && isEmpty(candidate.candidate_vacancies_in_use) && (
                <div className={cn('candidate-status-action')}>
                  <p className={('p2 p2_theme_light_second fw_100 indent_reset')}>Последнее действие</p>
                  <p className={('p2 p2_theme_light_second fw_100 indent_reset')}>{moment(candidate.last_action).format('DD.MM.YYYY')}</p>
                </div>
              )}
              { !isEmpty(candidate.candidate_vacancies_in_use) &&
                candidate.candidate_vacancies_in_use.slice(0, 2).map((item) => (
                  <div
                    className={cn('user-status')}
                    style={{
                      backgroundColor: item.current_vacancy_stage.vacancy_stage_group.color,
                    }}
                    key={item.id}
                  >
                    { item.current_vacancy_stage.name }
                  </div>
                ))}
            </div>
          )}
          <Arrow className={cn('candidate-chevron')}/>
        </div>
      </div>
    )
  }
}
