import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 25 24">
    <path color={color} d="M22.6 6.4c.1.1.2.1.4.1.1 0 .3-.1.4-.2 1.3-1.4 1.3-3.6 0-4.9-1.3-1.3-3.5-1.4-4.9 0-.1.1-.2.2-.2.4 0 .1.1.3.1.4L20.1 4l-.7.7c-1.8-1.6-4.2-2.6-6.9-2.6s-5.2 1-7.1 2.7L4.7 4l1.8-1.8c0-.1.1-.2.1-.4s-.1-.2-.2-.3C5 .2 2.8.2 1.5 1.5.2 2.8.1 5 1.5 6.4c.1.1.3.2.4.2.1 0 .3-.1.4-.1L4 4.7l.9.9c-1.7 1.9-2.7 4.3-2.7 7.1 0 2.7 1 5.2 2.7 7.1l-2.5 2.5c-.2.2-.2.5 0 .7.1-.1.2 0 .3 0s.3 0 .4-.1l2.5-2.5c1.9 1.7 4.3 2.7 7.1 2.7 2.7 0 5.2-1 7.1-2.7l2.5 2.5c.1.1.2.1.4.1s.3 0 .4-.1c.2-.2.2-.5 0-.7l-2.5-2.5c1.7-1.9 2.7-4.3 2.7-7.1s-1.1-5.4-2.9-7.3l.7-.7 1.5 1.8zM1.9 5.3c-.6-1-.5-2.3.3-3.1.5-.5 1.2-.7 1.8-.7.5 0 .9.1 1.3.4L1.9 5.3zm10.7 16.8c-2.6 0-5-1.1-6.7-2.8-1.7-1.7-2.8-4.1-2.8-6.7 0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5zm10-19.9c.8.8 1 2.1.3 3.1l-3.4-3.4c.9-.6 2.2-.5 3.1.3z"/>
  </svg>
)
