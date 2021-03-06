import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 16 16">
    <path
      fill={color}
      d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 15c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"
    />
    <path
      fill={color}
      d="M7.34 9.72c0-.42.05-.76.14-1.01.09-.24.27-.51.55-.82l.7-.72c.3-.34.45-.7.45-1.09 0-.38-.1-.67-.29-.88-.2-.21-.48-.32-.86-.32-.37 0-.66.1-.88.29s-.33.45-.33.78h-1c.01-.58.22-1.05.62-1.41.41-.36.94-.53 1.59-.53.68 0 1.2.18 1.58.54s.57.86.57 1.49c0 .62-.29 1.24-.87 1.85l-.59.58c-.26.29-.39.71-.39 1.25h-.99zM7.29 11.43c0-.16.05-.3.15-.41s.24-.17.44-.17.34.06.44.17.15.25.15.41-.05.3-.15.4-.25.16-.44.16-.34-.05-.44-.16c-.1-.1-.15-.24-.15-.4z"
    />
  </svg>
)
