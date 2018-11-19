import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 20 20">
    <path fill={color} d="M19 4h-1V3c0-.6-.4-1-1-1H9.4L7.7.3C7.5.1 7.3 0 7 0H3c-.5 0-1 .4-1 1v3H1c-.6 0-1 .5-1 1v14c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V5c0-.5-.4-1-1-1zM3 1h4l2 2h8v1H3V1zm16 18H1V5h18v14z" />
    <path fill={color} d="M2.5 8.5H10c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H2.5c-.3 0-.5.2-.5.5s.2.5.5.5zm0 2H10c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H2.5c-.3 0-.5.2-.5.5s.2.5.5.5zm0 2H7c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H2.5c-.3 0-.5.2-.5.5s.2.5.5.5z" />
  </svg>
)
