import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-download'} viewBox="0 0 15 19.99">
          <path
            fill={color}
            d="M14.5 19H7.71l.06-.06c.06-.04.1-.08.14-.14l4.94-4.94c.2-.2.2-.51 0-.71s-.51-.2-.71 0L7.99 17.3V.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v16.79l-4.15-4.15c-.2-.2-.51-.2-.71 0s-.2.51 0 .71l4.94 4.94c.04.06.08.1.14.14l.06.06H.5c-.28 0-.5.22-.5.5s.22.5.5.5h14c.28 0 .5-.22.5-.5s-.22-.49-.5-.49z"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 15 19.99">
        <path
          fill={color}
          d="M14.5 19H7.71l.06-.06c.06-.04.1-.08.14-.14l4.94-4.94c.2-.2.2-.51 0-.71s-.51-.2-.71 0L7.99 17.3V.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v16.79l-4.15-4.15c-.2-.2-.51-.2-.71 0s-.2.51 0 .71l4.94 4.94c.04.06.08.1.14.14l.06.06H.5c-.28 0-.5.22-.5.5s.22.5.5.5h14c.28 0 .5-.22.5-.5s-.22-.49-.5-.49z"
        />
      </svg>
    )
  }
}
