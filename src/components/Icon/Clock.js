import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 16 16">
    <path
      fill={color}
      d="M10.56 10.38c-.1 0-.21-.03-.3-.1L7.7 8.4a.507.507 0 0 1-.2-.4V4.9c0-.28.22-.5.5-.5s.5.22.5.5v2.84l2.35 1.73c.22.16.27.48.11.7a.49.49 0 0 1-.4.21z"
    />
    <path
      fill={color}
      d="M8 1c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7m0-1C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
    />
  </svg>
)
