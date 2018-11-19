import React from 'react'

export default ({ color, className, style, dir }) => {
  switch (dir) {
    case 'up':
      return (
        <svg style={{ ...style, transform: 'rotate(180deg)' }} className={className} viewBox="0 0 11 7">
          <path
            fill={color}
            d="M5.48 6.49a.47.47 0 0 1-.35-.15L.15 1.36c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.63 4.62L10.15.64c.2-.19.51-.19.71 0 .2.2.19.51 0 .71L5.83 6.34a.47.47 0 0 1-.35.15z"
          />
        </svg>
      )
    case 'right':
      return (
        <svg style={{ ...style, transform: 'rotate(-90deg)' }} className={className} viewBox="0 0 11 7">
          <path
            fill={color}
            d="M5.48 6.49a.47.47 0 0 1-.35-.15L.15 1.36c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.63 4.62L10.15.64c.2-.19.51-.19.71 0 .2.2.19.51 0 .71L5.83 6.34a.47.47 0 0 1-.35.15z"
          />
        </svg>
      )
    case 'left':
      return (
        <svg style={{...style, transform: 'rotate(90deg)' }} className={className} viewBox="0 0 11 7">
          <path
            fill={color}
            d="M5.48 6.49a.47.47 0 0 1-.35-.15L.15 1.36c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.63 4.62L10.15.64c.2-.19.51-.19.71 0 .2.2.19.51 0 .71L5.83 6.34a.47.47 0 0 1-.35.15z"
          />
        </svg>
      )
    default:
      return (
        <svg style={style} className={className} viewBox="0 0 11 7">
          <path
            fill={color}
            d="M5.48 6.49a.47.47 0 0 1-.35-.15L.15 1.36c-.2-.2-.2-.51 0-.71s.51-.2.71 0l4.63 4.62L10.15.64c.2-.19.51-.19.71 0 .2.2.19.51 0 .71L5.83 6.34a.47.47 0 0 1-.35.15z"
          />
        </svg>
      )
  }
}
