import React, { Component } from 'react'

import Groupment from '../Groupment'
import CandidateContact from './CandidateContact'
import { sortBy, get } from 'lodash'

import { cn, renderContactLink } from '../common'

export default class CandidateContactWrapper extends Component {
  renderContact(i, candidate){
    if (candidate.resume.resume_contacts.length > 0)
      return(
        <CandidateContact key={`CandidateContact${i}${candidate.id}`}>
          {
            sortBy(get(candidate, 'resume.resume_contacts', {}), ['contact_type', 'value']).map((it, i) => (
              renderContactLink(it, it.preferred, `${it.id}${candidate.id}${i}`)
            ))
          }
        </CandidateContact>
      )
    return (
      <CandidateContact key={`CandidateContact${i}${candidate.id}`}>
        <span>Информации нет</span>
      </CandidateContact>
    )
  }
  render () {
    const { comparison: { nonPdfItemsToDisplay = [], candidates = [], isAnyPdf = false } } = this.props
    return (
      <div>
        <Groupment candidate_one_title={'Контакты'} groupment={true} candidates={candidates} isAnyPdf={isAnyPdf} />
        <div className={cn('candidate-wrapper-children')}>
          {nonPdfItemsToDisplay.map((it,i) => this.renderContact.call(this, i, it.candidate, it.options))}
        </div>
      </div>
    )
  }
}
