import React, { Component } from 'react'

import CandidateHeader from '../CandidateHeader'
import CandidateContact from '../CandidateContact'
import CandidateExperience from '../CandidateExperience'
import CandidateInfo from '../CandidateInfo'
import CandidateEducation from '../CandidateEducation'
import CandidateRecommendation from '../CandidateRecommendation'

export default class NormalLayout extends Component {
  render(){
    return (
      <div>
        <CandidateHeader {...this.props}/>
        <CandidateContact {...this.props}/>
        <CandidateExperience {...this.props}/>
        <CandidateInfo {...this.props}/>
        <CandidateEducation {...this.props}/>
        <CandidateRecommendation {...this.props}/>
      </div>
    )
  }
}