// @flow

import React from 'react'

export default ({ className, color, style }) => (
  <svg style={style} className={className} viewBox="0 0 56 56">
    <path fill={color} d="M28 0C12.54 0 0 12.54 0 28s12.54 28 28 28 28-12.54 28-28S43.46 0 28 0zm0 54C13.66 54 2 42.34 2 28S13.66 2 28 2s26 11.66 26 26-11.66 26-26 26z"/>
    <path fill={color} d="M31.25 16.8h-.52c-4.38 0-7.95 3.57-7.95 7.95v10.42l-2.52-2.51c-.36-.36-.96-.36-1.32 0s-.36.96 0 1.32l4.11 4.11c.18.17.41.27.66.27.25 0 .48-.1.66-.27l4.11-4.11c.37-.36.37-.96 0-1.32a.942.942 0 0 0-1.32 0l-2.51 2.51V24.75c0-3.35 2.73-6.09 6.08-6.09h.52c3.36 0 6.09 2.73 6.09 6.09v2.68c0 .52.42.93.93.93.52 0 .93-.42.93-.93v-2.68c0-4.38-3.57-7.95-7.95-7.95z"/>
  </svg>
)