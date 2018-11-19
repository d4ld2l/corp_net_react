import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_user_by-parts btn-icon_40 ${className && className}`}>
        <svg className={'icon is-user_by-parts'} viewBox="0 0 8 16">
          <path
            fill={color}
            d="M4 0C2.3 0 1 1.3 1 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3m0 1c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2M2.6 6.6c-.3 0-.5 0-.6.2-1.3.9-2 2.5-2 4.3V15c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-3.9c0-1.8-.7-3.4-2-4.3-.1-.2-.3-.2-.6-.2s-.4 0-.6.2c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3-.2-.2-.4-.2-.6-.2m2.8 1c1 .7 1.6 2 1.6 3.5V15H1v-3.9c0-1.5.6-2.8 1.6-3.5.4.3.9.5 1.4.5.5 0 1-.2 1.4-.5"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 8 16">
        <path
          fill={color}
          d="M4 0C2.3 0 1 1.3 1 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3m0 1c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2M2.6 6.6c-.3 0-.5 0-.6.2-1.3.9-2 2.5-2 4.3V15c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-3.9c0-1.8-.7-3.4-2-4.3-.1-.2-.3-.2-.6-.2s-.4 0-.6.2c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3-.2-.2-.4-.2-.6-.2m2.8 1c1 .7 1.6 2 1.6 3.5V15H1v-3.9c0-1.5.6-2.8 1.6-3.5.4.3.9.5 1.4.5.5 0 1-.2 1.4-.5"
        />
      </svg>
    )
  }
}
