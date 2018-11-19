import React, { Component } from 'react'

import Groupment from '../Groupment'
import CandidateRecommendation from './CandidateRecommendation'
import Recommendation from './Recommendation'

import { cn } from '../common'

export default class CandidateRecommendationWrapper extends Component {
  renderRecomendations(i, candidate){
    if (candidate.resume.resume_recommendations.length > 0)
      return(
        <CandidateRecommendation key={`CandidateRecommendation${i}${candidate.id}`}>
          {candidate.resume.resume_recommendations.map(item => (
            <Recommendation
              key={`Recommendation${item.id}`}
              recommender_name={item.recommender_name}
              company_and_position={item.company_and_position}
              phone={item.phone}
              email={item.email}
            />
          ))}
        </CandidateRecommendation>
      )
    return (
      <CandidateRecommendation key={`CandidateRecommendation${i}${candidate.id}`}>
        <Recommendation />
      </CandidateRecommendation>
    ) 
  }
  render(){
    const { comparison: { nonPdfItemsToDisplay = [], candidates = [], isAnyPdf = false } } = this.props
    return (
      <div className={cn('end')}>
        <Groupment candidate_one_title={'Рекомендации'} groupment={true} candidates={candidates} isAnyPdf={isAnyPdf} />
        <div className={cn('candidate-wrapper-children')}>
          {nonPdfItemsToDisplay.map((it,i) => this.renderRecomendations.call(this, i, it.candidate, it.options))}
        </div>
      </div>
    )
  }
}
