import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 3 4">
    <path
      fill={color}
      d="M1 4c-.1 0-.19-.03-.28-.08a.498.498 0 0 1-.14-.69L1.4 2 .59.78a.498.498 0 0 1 .83-.55l1 1.5a.5.5 0 0 1 0 .55l-1 1.5c-.1.14-.26.22-.42.22z"
    />
  </svg>
)
