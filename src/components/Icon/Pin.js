import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 14 16">
    <path
      fill={color}
      d="M7 4.5c-.8 0-1.5.7-1.5 1.5S6.2 7.5 7 7.5 8.5 6.8 8.5 6 7.8 4.5 7 4.5m0 4C5.6 8.5 4.5 7.4 4.5 6S5.6 3.5 7 3.5 9.5 4.6 9.5 6 8.4 8.5 7 8.5"
    />
    <path
      fill={color}
      d="M7 0C3.1 0 0 3.1 0 7s7 9 7 9 7-5.1 7-9-3.1-7-7-7m0 1c3.3 0 6 2.7 6 6 0 2.5-3.9 6.1-6 7.7C5 13.1 1 9.5 1 7c0-3.3 2.7-6 6-6"
    />
  </svg>
)
