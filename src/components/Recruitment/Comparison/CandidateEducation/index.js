import React, { Component } from 'react'
import moment from 'moment'
import get from 'lodash/get'

import Groupment from '../Groupment'
import Education from './Education'
import EducationList from './EducationList'
import CandidateEducation from './CandidateEducation'

import { cn } from '../common'

export default class CandidateEducationWrapper extends Component {
  renderEducation(i, candidate){
    if (candidate.resume.resume_educations.length > 0     || 
        candidate.resume.resume_qualifications.length > 0 || 
        candidate.resume.resume_certificates.length > 0
    )
      return(
        <CandidateEducation key={`CandidateEducation${i}${candidate.id}`}>
          {candidate.resume.resume_educations.length > 0 && (
            <EducationList title={'Образование'}>
              {candidate.resume.resume_educations.map(item => (
                <Education
                  key={`resumeEducations${item.id}${candidate.id}`}
                  education_level={item.education_level && item.education_level.name}
                  name={item.school_name}
                  end_year={item.end_year}
                  company_name={item.faculty_name}
                  speciality={item.speciality}
                />
              ))}
            </EducationList>
          )}
          {(candidate.resume.resume_qualifications.length > 0) && (
            <EducationList title={'Сертификаты'}>
              {candidate.resume.resume_qualifications.map(item => (
                <Education
                  key={`resumeQualifications${item.id}${candidate.id}`}
                  name={item.speciality}
                  end_year={item.end_year ? moment(item.end_year).format('YYYY') : ''}
                  file_url={item.file && item.file.url}
                  company_name={item.company_name}
                  speciality={item.name}
                />
              ))}
            </EducationList>
          )}
          {(candidate.resume.resume_certificates.length > 0) && (
            <EducationList title={'Курсы'}>
              {candidate.resume.resume_certificates.map(item => (
                <Education
                  key={`resumeCertificates${item.id}${candidate.id}`}
                  name={item.name}
                  end_year={item.end_date ? moment(item.end_date).format('YYYY') : ''}
                  company_name={item.company_name}
                  speciality={item.speciality}
                  file_url={item.file && item.file.url}
                />
              ))}
            </EducationList>
          )}
        </CandidateEducation>
      ) 
    return (
      <CandidateEducation key={`CandidateEducation${i}${candidate.id}`}>
        <span>Информации нет</span>
      </CandidateEducation>
    )
  }
  render(){
    const { candidates: { current = {}, select = [] } } = this.props
    const { comparison: { positionInArray = {} } } = this.props
    const comparedCandidate = select[positionInArray]
    const { comparison: { nonPdfItemsToDisplay = [], candidates = [], isAnyPdf = false } } = this.props
    const leftCandidateEducationLevel = current.resume.resume_educations.length > 0
            ? `${get(current, 'resume.resume_educations[0].education_level.name', false) ? ' - ' : ''}${get(current, 'resume.resume_educations[0].education_level.name', '')}`
            : ''
    const rightCandidateEducationLevel = comparedCandidate.resume.resume_educations.length > 0
            ? get(comparedCandidate, 'resume.resume_educations[0].education_level.name', '')
            : ''
    return (
      <div>
        <Groupment
          candidate_one_title={`Образование${leftCandidateEducationLevel}`}
          candidate_two_title={rightCandidateEducationLevel}
          groupment={true}
          candidates={candidates}
          isAnyPdf={isAnyPdf}
        />
        <div className={cn('candidate-wrapper-children')}>
          {nonPdfItemsToDisplay.map((it,i) => this.renderEducation.call(this, i, it.candidate, it.options))}
        </div>
      </div>
    )
  }
} 
