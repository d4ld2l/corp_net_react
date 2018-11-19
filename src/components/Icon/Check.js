import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-check'} viewBox="0 0 20.8 18.2">
          <path
            fill={color}
            d="M20.6.2c-.2-.2-.5-.2-.7 0L18.1 2V.5c.1-.3-.1-.5-.4-.5H.5C.2 0 0 .2 0 .5v17.2c0 .3.2.5.5.5h17.2c.3 0 .5-.2.5-.5V3.3L20.7.8c.1-.1.1-.4-.1-.6zm-3.4 17H1V1h16.2v1.9L9.1 11 4.8 6.7c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7L8.7 12c.1.1.2.1.4.1s.3 0 .4-.1l7.7-7.7v12.9z"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 20.8 18.2">
        <path
          fill={color}
          d="M20.6.2c-.2-.2-.5-.2-.7 0L18.1 2V.5c.1-.3-.1-.5-.4-.5H.5C.2 0 0 .2 0 .5v17.2c0 .3.2.5.5.5h17.2c.3 0 .5-.2.5-.5V3.3L20.7.8c.1-.1.1-.4-.1-.6zm-3.4 17H1V1h16.2v1.9L9.1 11 4.8 6.7c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7L8.7 12c.1.1.2.1.4.1s.3 0 .4-.1l7.7-7.7v12.9z"
        />
      </svg>
    )

  }
}
