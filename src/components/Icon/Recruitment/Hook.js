// @flow

import React from 'react'

export default ({ className, color, style }) => (
  <svg className={className} style={style} viewBox="0 0 11 11">
    <path fill={color} d="M10.5 8.04a.47.47 0 0 0-.66 0L8.58 9.3V4.09C8.58 1.9 6.8.11 4.6.11h-.26C2.15.11.36 1.89.36 4.09v1.34a.47.47 0 1 0 .94 0V4.09c0-1.68 1.36-3.04 3.04-3.04h.26c1.68 0 3.04 1.37 3.04 3.04V9.3L6.39 8.04a.47.47 0 0 0-.66 0 .47.47 0 0 0 0 .66l2.05 2.05c.09.09.21.14.33.14.12 0 .24-.05.33-.14L10.5 8.7a.47.47 0 0 0 0-.66"/>
  </svg>
)
