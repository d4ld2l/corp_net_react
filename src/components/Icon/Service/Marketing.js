// @flow

import React from 'react'

export default ({ className, color, style }) => (
  <svg style={style} className={className} viewBox="0 0 20 16">
    <path
      fill={color}
      d="M19.18 7.61c0-1.37-1.07-2.49-2.42-2.6V1.43c0-.18-.09-.34-.25-.43-.15-.09-.34-.09-.5-.01l-6.9 3.85H4.75c-.65 0-1.2.42-1.41 1h-.7c-1 0-1.81.81-1.81 1.81s.81 1.81 1.81 1.81h.7c.21.58.76 1 1.41 1h.18v3.1c0 .83.67 1.5 1.5 1.5h.58c.83 0 1.5-.67 1.5-1.5v-3.1h.61l6.9 3.79c.08.04.16.06.24.06.09 0 .18-.02.25-.07.15-.09.25-.25.25-.43V10.2c1.35-.1 2.42-1.22 2.42-2.59zm-17.36.05c0-.45.37-.81.81-.81h.61v1.63h-.6c-.45-.01-.82-.38-.82-.82zm2.43 1.31V6.34c0-.28.22-.5.5-.5h4v3.63h-4c-.28 0-.5-.23-.5-.5zm3.26 4.6c0 .28-.22.5-.5.5h-.58c-.28 0-.5-.22-.5-.5v-3.1h1.58v3.1zm8.25-.59l-6.01-3.3V5.64l6.01-3.36v10.7zm1-3.78V6.01c.8.1 1.42.77 1.42 1.6 0 .82-.62 1.49-1.42 1.59z"
    />
  </svg>
)
