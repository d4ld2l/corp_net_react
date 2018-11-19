import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 6 10">
    <path
      fill={color}
      d="M3.82 4.37a2.275 2.275 0 1 0-1.77 0A2.503 2.503 0 0 0 0 6.83v2.62c0 .28.22.5.5.5h4.88c.28 0 .5-.22.5-.5V6.83c0-1.23-.89-2.25-2.06-2.46zm-2.16-2.1c0-.7.57-1.27 1.28-1.27.7 0 1.27.57 1.27 1.27s-.57 1.28-1.27 1.28c-.71 0-1.28-.57-1.28-1.28zm3.22 6.68H1V6.83c0-.83.67-1.5 1.5-1.5h.88c.83 0 1.5.67 1.5 1.5v2.12z"
    />
  </svg>
)
