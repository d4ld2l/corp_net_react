import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-copy'} viewBox="0 0 16 16">
          <path fill={color} d="M11 5V0H0v11h5v5h11V5h-5zm-6 5H1V1h9v4H5v5zm10 5H6V6h9v9z" />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 16 16">
        <path fill={color} d="M11 5V0H0v11h5v5h11V5h-5zm-6 5H1V1h9v4H5v5zm10 5H6V6h9v9z" />
      </svg>
    )
  }
}
