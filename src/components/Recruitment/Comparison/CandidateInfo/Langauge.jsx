import React from 'react'

import { cn } from '../common'

export const Langauge = ({ language_name, language_name_dublicate }) => (
  <span>
    {language_name_dublicate && (
      <p className={cn('language-text').mix(cn('language-text_dublicate'))}>
        {language_name_dublicate}
      </p>
    )}
    {language_name && <p className={cn('language-text')}>{language_name}</p>}
  </span>
)

export default Langauge
