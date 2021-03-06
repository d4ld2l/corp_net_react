import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-pencil'} viewBox="0 0 16 16">
          <path
            fill={color}
            d="M14.92 2.25l-1.18-1.18c-.74-.75-2.05-.75-2.8 0L2.62 9.41c-.05.05-.09.11-.12.18L.53 14.83c-.07.18-.02.39.11.53.1.1.22.15.35.15.06 0 .12-.01.18-.03l5.24-1.97c.07-.02.13-.06.18-.11l8.33-8.33c.77-.79.77-2.04 0-2.82zM3.11 10.81l2.08 2.08-3.33 1.25 1.25-3.33zm3.02 1.62L3.57 9.87l6.29-6.29 2.56 2.56-6.29 6.29zm8.08-8.08l-1.08 1.08-2.56-2.56 1.08-1.08c.37-.37 1.02-.37 1.38 0l1.18 1.18c.39.37.39.99 0 1.38z"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg tabIndex={'0'} style={style} className={className} viewBox="0 0 16 16">
        <path
          fill={color}
          d="M14.92 2.25l-1.18-1.18c-.74-.75-2.05-.75-2.8 0L2.62 9.41c-.05.05-.09.11-.12.18L.53 14.83c-.07.18-.02.39.11.53.1.1.22.15.35.15.06 0 .12-.01.18-.03l5.24-1.97c.07-.02.13-.06.18-.11l8.33-8.33c.77-.79.77-2.04 0-2.82zM3.11 10.81l2.08 2.08-3.33 1.25 1.25-3.33zm3.02 1.62L3.57 9.87l6.29-6.29 2.56 2.56-6.29 6.29zm8.08-8.08l-1.08 1.08-2.56-2.56 1.08-1.08c.37-.37 1.02-.37 1.38 0l1.18 1.18c.39.37.39.99 0 1.38z"
        />
      </svg>
    )
  }
}
