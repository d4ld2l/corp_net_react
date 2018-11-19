// @flow

import React from 'react'

export default ({ className, color, style }) => (
  <svg style={style} className={className} viewBox="0 0 56 56">
    <path fill={color} d="M28 0C12.54 0 0 12.54 0 28s12.54 28 28 28 28-12.54 28-28S43.46 0 28 0zm0 54C13.66 54 2 42.34 2 28S13.66 2 28 2s26 11.66 26 26-11.66 26-26 26z"/>
    <path fill={color} d="M35.74 32.66l-2.52 2.51V24.75c0-4.38-3.57-7.95-7.95-7.95h-.52c-4.38 0-7.95 3.57-7.95 7.95v2.68c0 .52.42.93.93.93.52 0 .93-.42.93-.93v-2.68c0-3.35 2.73-6.09 6.09-6.09h.52c3.35 0 6.08 2.73 6.08 6.09v10.42l-2.51-2.51a.942.942 0 0 0-1.32 0c-.37.36-.37.96 0 1.32l4.11 4.11a.938.938 0 0 0 1.32 0l4.11-4.11a.932.932 0 1 0-1.32-1.32z"/>
  </svg>
)
