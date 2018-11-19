import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 13 13">
    <path
      fill={color}
      d="M12 1v8h-2v3L7 9H1V1h11m0-1H1C.45 0 0 .45 0 1v8c0 .55.45 1 1 1h5.59l2.71 2.71c.18.19.44.29.7.29.13 0 .26-.02.38-.08.38-.15.62-.52.62-.92v-2h1c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z"
    />
  </svg>
)
