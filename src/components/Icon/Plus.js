import React from 'react'

export default ({ color, className, style, outline }) => {
  switch (outline) {
    case 40:
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
          <svg className={'icon is-plus'} viewBox="0 0 11 11">
            <path
              fill={color}
              d="M10.5 6H6v4.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V6H.5C.2 6 0 5.8 0 5.5S.2 5 .5 5H5V.5c0-.3.2-.5.5-.5s.5.2.5.5V5h4.5c.3 0 .5.2.5.5s-.2.5-.5.5z"
            />
          </svg>
        </div>
      )
    case 30:
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_30 ${className && className}`}>
          <svg className={'icon is-plus_11'} viewBox="0 0 11 11">
            <path
              fill={color}
              d="M10.5 6H6v4.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V6H.5C.2 6 0 5.8 0 5.5S.2 5 .5 5H5V.5c0-.3.2-.5.5-.5s.5.2.5.5V5h4.5c.3 0 .5.2.5.5s-.2.5-.5.5z"
            />
          </svg>
        </div>
      )
    case 'filled' :
      return (
        <div tabIndex={'0'} className={`btn-icon btn-icon_30 btn-icon_filled ${className && className}`}>
          <svg className={'icon icon_white is-plus_11'} viewBox="0 0 11 11">
            <path
              fill={color}
              d="M10.5 6H6v4.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V6H.5C.2 6 0 5.8 0 5.5S.2 5 .5 5H5V.5c0-.3.2-.5.5-.5s.5.2.5.5V5h4.5c.3 0 .5.2.5.5s-.2.5-.5.5z"
            />
          </svg>
        </div>
      )
    default :
      return (
        <svg className={className} style={style} viewBox="0 0 11 11">
          <path
            fill={color}
            d="M10.5 6H6v4.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V6H.5C.2 6 0 5.8 0 5.5S.2 5 .5 5H5V.5c0-.3.2-.5.5-.5s.5.2.5.5V5h4.5c.3 0 .5.2.5.5s-.2.5-.5.5z"
          />
        </svg>
      )
  }
}
