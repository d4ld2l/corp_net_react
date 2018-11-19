import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 20 20">
    <path
      fill={color}
      d="M19 0H8c-.55 0-1 .45-1 1v4H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h1v2c0 .4.24.77.62.92.12.06.25.08.38.08.26 0 .52-.1.71-.29L6.41 17H12c.55 0 1-.45 1-1v-4h.59l2.71 2.71c.18.19.44.29.7.29.13 0 .26-.02.38-.08.38-.15.62-.52.62-.92v-2h1c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-7 16H6l-3 3v-3H1V6h11v10zm7-5h-2v3l-3-3h-1V6c0-.55-.45-1-1-1H8V1h11v10z"
    />
    <circle fill={color} cx="6.55" cy="11.42" r=".5" />
    <circle fill={color} cx="8.56" cy="11.42" r=".5" />
    <circle fill={color} cx="4.55" cy="11.42" r=".5" />
  </svg>
)
