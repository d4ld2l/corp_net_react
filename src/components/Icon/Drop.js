import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 5 25">
    <g fill={color} transform="rotate(90 2.5 2.5)">
      <circle fill={color} cx="2.5" cy="2.5" r="2.5" />
      <circle fill={color} cx="12.5" cy="2.5" r="2.5" />
      <circle fill={color} cx="22.5" cy="2.5" r="2.5" />
    </g>
  </svg>
)
