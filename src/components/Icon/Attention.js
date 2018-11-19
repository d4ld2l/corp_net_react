import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 10 20">
    <path fill={color} style={style} d="M0 0h10L4 10.1l6 9.9H0z" />
  </svg>
)
