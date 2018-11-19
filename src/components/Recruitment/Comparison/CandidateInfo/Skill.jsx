import React from 'react'

import { cn } from '../common'

export const Skill = ({ key_skill_name, key_skill_name_dublicate }) => (
  <span>
    {key_skill_name_dublicate && (
      <mark className={cn('mark').mix(cn('mark_dublicate'))}>{key_skill_name_dublicate}</mark>
    )}
    {key_skill_name && <mark className={cn('mark')}>{key_skill_name}</mark>}
  </span>
)

export default Skill
