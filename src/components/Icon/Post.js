import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-post'} viewBox="0 0 14 14">
          <path
            fill={color}
            d="M13.5 0H.5C.22 0 0 .22 0 .5v13c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V.5c0-.28-.22-.5-.5-.5zm-1.21 1L7 6.29 1.71 1h10.58zM1 13V1.71l5.65 5.65c.09.09.22.14.35.14s.26-.05.35-.15L13 1.71V13H1z"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 14 14">
        <path
          fill={color}
          d="M13.5 0H.5C.22 0 0 .22 0 .5v13c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V.5c0-.28-.22-.5-.5-.5zm-1.21 1L7 6.29 1.71 1h10.58zM1 13V1.71l5.65 5.65c.09.09.22.14.35.14s.26-.05.35-.15L13 1.71V13H1z"
        />
      </svg>
    )
  }
}
