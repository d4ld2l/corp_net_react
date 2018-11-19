import React from 'react'

export default ({ color, className, style, type }) => {
  switch (type) {
    case 'outline':
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
          <svg className={'icon is-rewind_double'} viewBox="0 0 17.3 12">
            <path
              fill={color}
              d="M17 5.6L8.9.1c-.1-.1-.3-.1-.5 0s-.3.2-.3.4V5L.7 0C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l7.3-5v4.6c0 .2.1.3.3.4.1.1.1.1.2.1s.2 0 .3-.1L17 6.4c.1-.1.2-.3.2-.4s0-.3-.2-.4zm-16 5V1.5L7.7 6 1 10.6zm8.1 0V1.4L15.9 6l-6.8 4.6z"
            />
          </svg>
        </div>
      )
    case 'filled':
      return (
        <div
          tabIndex={'0'}
          className={`btn-icon btn-icon_filled btn-icon_30 ${className && className}`}
        >
          <svg className={'icon icon_white is-rewind_double'} viewBox="0 0 17.3 12">
            <path
              fill={color}
              d="M17 5.6L8.9.1c-.1-.1-.3-.1-.5 0s-.3.2-.3.4V5L.7 0C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l7.3-5v4.6c0 .2.1.3.3.4.1.1.1.1.2.1s.2 0 .3-.1L17 6.4c.1-.1.2-.3.2-.4s0-.3-.2-.4zm-16 5V1.5L7.7 6 1 10.6zm8.1 0V1.4L15.9 6l-6.8 4.6z"
            />
          </svg>
        </div>
      )
    default:
      return (
        <svg style={style} className={className} viewBox="0 0 17.3 12">
          <path
            fill={color}
            d="M17 5.6L8.9.1c-.1-.1-.3-.1-.5 0s-.3.2-.3.4V5L.7 0C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l7.3-5v4.6c0 .2.1.3.3.4.1.1.1.1.2.1s.2 0 .3-.1L17 6.4c.1-.1.2-.3.2-.4s0-.3-.2-.4zm-16 5V1.5L7.7 6 1 10.6zm8.1 0V1.4L15.9 6l-6.8 4.6z"
          />
        </svg>
      )
  }
}
