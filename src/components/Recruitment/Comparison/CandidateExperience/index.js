import React, { Component } from 'react'
import { get, reverse, sortBy } from 'lodash' 

import Groupment from '../Groupment'
import CandidateExperienceList from './CandidateExperienceList'
import CandidateExperienceItem from './CandidateExperienceItem'

import { cn, formatDateDiff } from '../common'

export default class CandidateExperience extends Component {
  renderWorkExpirience(i, candidate){
    if (get(candidate.resume, 'resume_work_experiences', []).length > 0) 
      return (
        <CandidateExperienceList key={`CandidateExperienceList${i}${candidate.id}`}>
          {reverse(
              sortBy(
                get(candidate.resume, 'resume_work_experiences', []),
                ['end_date', 'start_day']
              )
            ).map((exp, it) => (
              <CandidateExperienceItem
                key={`${it}${exp.id}`}
                start_date={exp.start_date}
                end_date={exp.end_date}
                position={exp.position}
                company_name={exp.company_name}
                website={exp.website || ''}
                region={exp.region}
                experience_description={exp.experience_description}
              />
            ))}
        </CandidateExperienceList>
      )
    return (
      <CandidateExperienceList key={`CandidateExperienceList${i}${candidate.id}`}>
        <span>Информации нет</span>
      </CandidateExperienceList>
    )
  }

  render(){
    const { candidates: { current = {}, select = [] } } = this.props
    const { comparison: { positionInArray = {} } } = this.props
    const comparedCandidate = select[positionInArray]
    const { comparison: { nonPdfItemsToDisplay = [], candidates = [], isAnyPdf = false } } = this.props
    return(
      <div>
        <Groupment
          candidate_one_title={`Опыт работы${current.resume.summary_work_period ? ' — ' : ''}${formatDateDiff(current.resume.summary_work_period)}`}
          candidate_two_title={formatDateDiff(comparedCandidate.resume.summary_work_period)}
          groupment={true}
          candidates={candidates}
          isAnyPdf={isAnyPdf}
        />
        <div className={cn('candidate-wrapper-children')}>
          {nonPdfItemsToDisplay.map((it,i) => this.renderWorkExpirience.call(this, i, it.candidate, it.options))}
        </div>
      </div>
    )
  }
}
