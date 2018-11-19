import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 30 30">
    <path color={color} d="M21.81 14.56V2.5h-20v20h13.8c.8 2.42 3.07 4.17 5.75 4.17 3.34 0 6.06-2.72 6.06-6.06.01-3.2-2.47-5.82-5.61-6.05zM2.81 3.5h18v11.07c-.24.02-.47.06-.7.1-.01-.01-.01-.02-.02-.02l-3.07-2.54c-.18-.15-.46-.15-.64 0l-5.77 4.85-2.77-2.21c-.2-.16-.48-.14-.66.03L2.8 18.94V3.5zm0 18v-1.18l4.75-4.51 2.75 2.2c.19.15.45.15.63-.01l5.77-4.85 2.27 1.88c-2.16.93-3.68 3.08-3.68 5.57 0 .31.03.6.07.9H2.81zm18.56 4.17c-2.79 0-5.06-2.27-5.06-5.06s2.27-5.06 5.06-5.06 5.06 2.27 5.06 5.06-2.27 5.06-5.06 5.06z" />
    <path color={color} d="M23.87 20.1h-2v-2c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2h-2c-.28 0-.5.22-.5.5s.22.5.5.5h2v2c0 .28.22.5.5.5s.5-.22.5-.5v-2h2c.28 0 .5-.22.5-.5s-.23-.5-.5-.5z" />
  </svg>
)
