import React from 'react'

import { cn } from '../common'

export const CandidateExperienceList = ({ children }) => (
  <div className={cn('candidate-experience')}>
    <ul className={cn('chronological-list')}>{children}</ul>
  </div>
)

export default CandidateExperienceList
