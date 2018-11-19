import React from 'react'

import { cn } from '../common'

export const EducationList = ({ title, children }) => (
  <div className={cn('education_list')}>
    {title && <h4 className={cn('margin-head-4')}>{title}</h4>}
    {children}
  </div>
  )

export default EducationList
