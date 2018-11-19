import React, { Component } from 'react'
import moment from 'moment'

import CandidateHeader from './CandidateHeader'

import { cn, renderContactLink } from '../common'

export default class CandidateHeaderWrapper extends Component {
  renderHeader(i, candidate, options){
    return (
      <CandidateHeader
        key={`CandidateHeader${i}${candidate.id}`}
        {...this.formatDataForComponent.call(this, candidate)}
        {...options}
      >
        {
          candidate.resume.preferred_contact ? (
            renderContactLink(candidate.resume.resume_contacts.filter(contact => contact.preferred)[0], true)
          ) : ('')
        }
      </CandidateHeader>
    )
  }

  formatDataForComponent(candidate){
    const { resume } = candidate
    return {
      date_added: moment(candidate.created_at).fromNow(),
      candidate_avatar: resume.photo.url,
      candidate_name_link_profile: `/recruitment/candidates/${candidate.id}`,
      candidate_name: this.getFormatedFullName(candidate),
      candidate_age: this.candidateYears(resume.birthdate),
      candidate_residency: resume.city,
      candidate_profession: resume.desired_position,
      status: this.getCandidateStatus(candidate),
      ...this.props
    }
  }

  getCandidateStatus(candidate){
    if (candidate.candidate_vacancies.length > 0){
      const { current_vacancy_stage: { name, vacancy_stage_group: { color } } } = candidate.candidate_vacancies[0]
      return { color, name}
    }
    return null
  }

  candidateYears(date) {
    if (!date) return ''
    const years = moment().diff(date, 'years')
    return `${years} ${years.toString().slice(-1) === 1
      ? 'год'
      : years.toString().slice(-1) < 5 ? 'года' : 'лет'}`
  }

  getFormatedFullName(candidate){
    return [candidate.last_name, candidate.first_name, candidate.middle_name].join(' ')
  }
  render() {
    const { candidate, comparison: { nonPdfItemsToDisplay = [] } } = this.props
    return (
      <div className={cn('wrapper_flex')}>
        {candidate
          ? this.renderHeader.call(this, 1, candidate.candidate, candidate.options)
          : nonPdfItemsToDisplay.map((it,i) => this.renderHeader.call(this, i, it.candidate, it.options))}
      </div>
    )
  }
}
