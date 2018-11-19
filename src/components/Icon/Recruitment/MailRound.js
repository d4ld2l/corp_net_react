// @flow

import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 40 40">
    <path fill={color} d="M20 1c10.477 0 19 8.523 19 19s-8.523 19-19 19S1 30.477 1 20 9.523 1 20 1m0-1C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0z" />
    <path fill={color} d="M26.5 13h-13c-.28 0-.5.22-.5.5v13c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-13c0-.28-.22-.5-.5-.5zm-1.21 1L20 19.29 14.71 14h10.58zM14 26V14.71l5.65 5.65c.09.09.22.14.35.14s.26-.05.35-.15L26 14.71V26H14z" />
  </svg>
)
