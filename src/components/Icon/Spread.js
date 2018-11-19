// @flow
import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 12 3">
    <path
      fill={color}
      d="M7.5 1.5C7.5 2.33 6.83 3 6 3s-1.5-.67-1.5-1.5S5.17 0 6 0s1.5.67 1.5 1.5m4.27 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5m-8.54 0c0 .83-.67 1.5-1.5 1.5S.23 2.33.23 1.5.9 0 1.73 0s1.5.67 1.5 1.5"
      className="st0"/>
  </svg>
)
