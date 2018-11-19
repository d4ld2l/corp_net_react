import React from 'react'

export default ({ color, className, style }) => (
  <svg className={className} style={style} viewBox="0 0 8 9">
    <path
      fill={color}
      d="M7.1 7.9c0 .3-.2.5-.5.5H1.4c-.3 0-.5-.2-.5-.5V4.4c0-.3.2-.5.5-.5h5.2c.3 0 .5.2.5.5v3.5zM4 1.2c1 0 1.7.8 1.7 1.8H2.3C2.3 2 3 1.2 4 1.2zM6.7 3C6.7 1.5 5.5.3 4 .3S1.3 1.5 1.3 3C.6 3.1 0 3.7 0 4.4v3.5c0 .8.6 1.4 1.4 1.4h5.2c.8 0 1.4-.6 1.4-1.4V4.4c0-.7-.6-1.3-1.3-1.4z"
    />
    <path fill={color} d="M4 6.6c-.3 0-.5.2-.5.4v1.3c0 .3.2.5.5.5s.5-.2.5-.5V7c0-.2-.2-.4-.5-.4" />
  </svg>
)
