import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 18 18">
    <path
      fill={color}
      d="M4.35 17.36c-.98 0-1.95-.37-2.7-1.11a3.771 3.771 0 0 1-1.11-2.7c0-1.02.4-1.98 1.11-2.7L11 1.51a3.808 3.808 0 0 1 5.39 0 3.808 3.808 0 0 1 0 5.39c-.2.2-.51.2-.71 0s-.2-.51 0-.71c1.1-1.1 1.1-2.88 0-3.98s-2.88-1.1-3.98 0l-9.35 9.35c-.53.53-.82 1.24-.82 1.99s.29 1.46.82 1.99c1.1 1.1 2.88 1.1 3.98 0l5.28-5.28c.56-.56.56-1.48 0-2.04s-1.48-.56-2.04 0l-4.03 4.03c-.2.2-.51.2-.71 0s-.2-.51 0-.71l4.03-4.03c.95-.95 2.5-.95 3.46 0 .95.95.95 2.5 0 3.45l-5.28 5.28c-.74.75-1.71 1.12-2.69 1.12z"
    />
  </svg>
)
