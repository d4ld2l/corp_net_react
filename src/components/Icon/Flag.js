import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 12 13">
    <path
      fill={color}
      d="M10.9 5.4L12 2.7c.1-.2 0-.3-.1-.5-.1-.1-.2-.2-.4-.2H6.8V.5c0-.3-.2-.5-.5-.5H.5C.2 0 0 .2 0 .5V12.6c0 .2.2.4.5.4s.5-.2.5-.5V6.7h3.1v1.5c0 .3.2.5.5.5h6.9c.2 0 .3-.1.4-.2.1-.1.1-.3.1-.4l-1.1-2.7zM1 1h4.8v4.7H1V1zm8.9 4.6l.9 2.2H5.1v-1h1.2c.3 0 .5-.2.5-.5V3h4l-.9 2.2c-.1.1-.1.3 0 .4z"
    />
  </svg>
)
