import React from 'react'

export default ({ color, className, style, type }) => {
  switch (type) {
    case 'outline':
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
          <svg className={'icon is-rewind'} viewBox="0 0 9 12">
            <path
              fill={color}
              d="M.5 12c-.1 0-.2 0-.2-.1-.2 0-.3-.2-.3-.4V.5C0 .3.1.2.3.1c.1-.1.3-.1.5 0l8 5.5c.1.1.2.2.2.4s-.1.3-.2.4l-8 5.5c-.1.1-.2.1-.3.1zM1 1.4v9.1L7.6 6 1 1.4z"
            />
            <path
              fill={color}
              d="M8.8 5.6L.8.1C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l8-5.5c.1-.1.2-.2.2-.4s-.1-.3-.2-.4zm-7.8 5V1.4L7.6 6 1 10.6z"
            />
          </svg>
        </div>
      )
    case 'filled':
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_filled btn-icon_30 ${className && className}`}>
          <svg className={'icon icon_white is-rewind'} viewBox="0 0 9 12">
            <path
              fill={color}
              d="M.5 12c-.1 0-.2 0-.2-.1-.2 0-.3-.2-.3-.4V.5C0 .3.1.2.3.1c.1-.1.3-.1.5 0l8 5.5c.1.1.2.2.2.4s-.1.3-.2.4l-8 5.5c-.1.1-.2.1-.3.1zM1 1.4v9.1L7.6 6 1 1.4z"
            />
            <path
              fill={color}
              d="M8.8 5.6L.8.1C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l8-5.5c.1-.1.2-.2.2-.4s-.1-.3-.2-.4zm-7.8 5V1.4L7.6 6 1 10.6z"
            />
          </svg>
        </div>
      )
    default:
      return (
        <svg style={style} className={className} viewBox="0 0 9 12">
          <path
            fill={color}
            d="M.5 12c-.1 0-.2 0-.2-.1-.2 0-.3-.2-.3-.4V.5C0 .3.1.2.3.1c.1-.1.3-.1.5 0l8 5.5c.1.1.2.2.2.4s-.1.3-.2.4l-8 5.5c-.1.1-.2.1-.3.1zM1 1.4v9.1L7.6 6 1 1.4z"
          />
          <path
            fill={color}
            d="M8.8 5.6L.8.1C.6 0 .4 0 .3.1.1.2 0 .3 0 .5v11c0 .2.1.3.3.4 0 .1.1.1.2.1s.2 0 .3-.1l8-5.5c.1-.1.2-.2.2-.4s-.1-.3-.2-.4zm-7.8 5V1.4L7.6 6 1 10.6z"
          />
        </svg>
      )
  }
}
