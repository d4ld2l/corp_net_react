import React from 'react'

export default ({ className, color, style }) => {
  return (
    <svg style={style} className={className} viewBox="0 0 27 27">
      <path fill={color} d="M26.5 23l-11-21.4c-1.1-2.2-3-2.2-4.1 0L.5 23c-1.1 2.2-.2 4 2 4h22c2.2 0 3.1-1.8 2-4zm-12-2.4h-2v-1.7h2v1.7zm0-4h-2V9.5h2v7.1z"/>
    </svg>
  )
}
