import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 18 20">
    <path fill={color} d="M17,8V0H1V8H0V20H18V8ZM12.5,3.5h-7v-1h7Zm1,1v1h-9v-1Zm1,2V8H3.5V6.5ZM2,1H16V8h-.5V5.5h-1v-2h-1v-2h-9v2h-1v2h-1V8H2ZM17,19H1V9H17Z"/>
    <path fill={color} d="M6,13.5h6a1.5,1.5,0,0,0,0-3H6a1.5,1.5,0,0,0,0,3Zm0-2h6a.5.5,0,0,1,0,1H6a.5.5,0,0,1,0-1Z"/>
  </svg>
)
