import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, Phone, Skype, Post } from 'components-folder/Icon'
import Checkbox from 'components-folder/Checkbox/Checkbox'
import get from "lodash/get";

import {
  getVacancyCandidate,
  toggleCheckVacancyCandidate,
} from 'redux-folder/actions/vacancyCardActions'

const cn = require('bem-cn')('vacancy-candidates-table')

if (process.env.BROWSER) {
  require('./style/VacancyCandidatesTable.css')
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

  handlerClick(){
    const { candidate, dispatch, match: { params: { id } } } = this.props
    dispatch(getVacancyCandidate(id, candidate.candidate.id))
  }

  render() {
    const {
      candidate,
      showCandidateCard,
      currentCandidate,
      dispatch,
    } = this.props

    return (
      <div
        className={cn('candidate').mix(candidate.id === currentCandidate.id && showCandidateCard && 'active')}
        key={candidate.id}
        style={{ height: !showCandidateCard ? '90px' : null }}
        onClick={ this.handlerClick.bind(this) }
      >
        <div
          onClick={(event) => {
            event.stopPropagation()
            dispatch(toggleCheckVacancyCandidate(candidate.id))
          }}
        >
          <Checkbox
            checked={candidate.isChecked}
            className={cn('candidate-checkbox')}
          />
        </div>

        <div className={cn('candidate-avatar')}
             style={{
               backgroundImage: `url(${get(candidate, 'candidate.resume.photo.url') || '/public/avatar.svg'})`
             }} >
        </div>

        <div
          className={cn('candidate-info').mix(`${!showCandidateCard ? 'flexible' : ''}`)}
        >
          <div className={cn('candidate-block')}>
            <Link
              to={`/recruitment/candidates/${candidate.candidate.id}`}
              className={cn('candidate-name').mix('link link_theme_light_first')}
            >
              { candidate.candidate.full_name }
            </Link>
            <span className={'p2 p2_theme_light_second'}>
              { get(candidate, 'candidate.resume.last_position')}
            </span>
          </div>
          {
            !showCandidateCard &&
            <div className={cn('candidate-address')}>
              { get(candidate, 'candidate.resume.preferred_contact', false) && (
                <span>
                  { this.contactIcon(candidate.candidate.resume.preferred_contact) }
                  { get(candidate, 'candidate.resume.preferred_contact.value') }
                </span>
              )}
            </div>
          }
          {
            !showCandidateCard &&
            candidate.candidate.resume && (
              <div className={cn('candidate-city')}>{ candidate.candidate.resume.city }</div>
            )
          }
          <div
            className={cn('candidate-status-badge')}
            style={{
              background: candidate.current_vacancy_stage.vacancy_stage_group.color || '#000',
            }}
          >
            {candidate.current_vacancy_stage.name}
            {candidate.current_vacancy_stage.evaluation_of_candidate && (
              <span
                className={cn('circle')}
                style={{
                  backgroundColor: candidate.current_candidate_rating ?
                    (candidate.current_candidate_rating.value ? '#20c58f' : '#ff2f51' )
                    : null,
                }}
              />
            )}
          </div>
        </div>
        <Arrow className={cn('candidate-chevron')}/>
      </div>
    )
  }
}
