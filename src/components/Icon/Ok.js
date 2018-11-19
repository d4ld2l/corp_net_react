// @flow
import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_30 ${className && className}`}>
        <svg className={'icon is-ok'} viewBox="0 0 14 11">
          <path fill={color} d="M5.02 10.73L.65 6.35c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.63 3.63 7.65-8.6c.18-.21.5-.23.71-.04.21.18.23.5.04.71l-8.37 9.39z"/>
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 14 11">
        <path fill={color} d="M5.02 10.73L.65 6.35c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.63 3.63 7.65-8.6c.18-.21.5-.23.71-.04.21.18.23.5.04.71l-8.37 9.39z"/>
      </svg>
    )
  }
}
