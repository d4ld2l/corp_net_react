// @flow

import React from 'react'

export default ({ className, color,  style }) => (
  <svg style={style} className={className} viewBox="0 0 14 10">
    <path fill={color} d="M13.19 0H.81c-.28 0-.5.22-.5.5v2.25c0 .28.22.5.5.5h.62V9.5c0 .28.22.5.5.5h10.12c.28 0 .5-.22.5-.5V3.25h.62c.28 0 .5-.22.5-.5V.5c.02-.28-.21-.5-.48-.5zm-1.63 9H2.44V3.25h9.12V9zm1.13-6.75H1.31V1h11.38v1.25z" />
    <path fill={color} d="M4.75 5.84h4.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-4.5c-.28 0-.5.22-.5.5s.22.5.5.5z" />
  </svg>
)
