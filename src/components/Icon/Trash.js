import React from 'react'

export default ({ color, className, style, outline }) => {
  if (outline) {
    return (
      <div tabIndex={'0'} className={`btn-icon btn-icon_40 ${className && className}`}>
        <svg className={'icon is-trash'} viewBox="0 0 22 23">
          <path
            fill={color}
            d="M21.2 2.8h-5.5v-.2c0-1.4-1.1-2.6-2.5-2.6H8.8C7.4 0 6.3 1.1 6.3 2.6v.3H.8c-.5-.1-.8.3-.8.7s.3.8.8.8h1.4c.4 3 1.8 14.4 2 15.2.4 2.3 1.5 3.4 3.4 3.4h6.8c1.5 0 3.3-.9 3.6-3.4.3-2.1 1.6-12.4 1.9-15.2h1.4c.4 0 .8-.4.8-.8s-.4-.8-.9-.8zM7.8 2.6c0-.5.4-1 1-1h4.4c.5 0 1 .4 1 1v.3H7.8v-.3zm8.6 16.8c-.3 1.8-1.4 2.1-2.1 2.1H7.6c-1.1 0-1.6-.6-1.9-2.1-.2-.7-1.4-10.4-2-15h14.6c-.4 3-1.6 12.9-1.9 15z"
          />
          <path
            fill={color}
            d="M11 7.6c-.4 0-.8.4-.8.8V18c0 .4.3.8.8.8s.8-.4.8-.8V8.4c0-.4-.4-.8-.8-.8zM13.8 8.3l-.8 9.8c0 .4.3.8.7.8h.1c.4 0 .7-.3.8-.7l.8-9.8c0-.4-.3-.8-.7-.8-.5 0-.8.3-.9.7zM7.3 7.6c-.4.1-.7.4-.7.9l.8 9.8c0 .4.4.7.8.7h.1c.4 0 .7-.4.7-.8l-.8-9.9c-.1-.4-.4-.7-.9-.7z"
          />
        </svg>
      </div>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 22 23">
        <path
          fill={color}
          d="M21.2 2.8h-5.5v-.2c0-1.4-1.1-2.6-2.5-2.6H8.8C7.4 0 6.3 1.1 6.3 2.6v.3H.8c-.5-.1-.8.3-.8.7s.3.8.8.8h1.4c.4 3 1.8 14.4 2 15.2.4 2.3 1.5 3.4 3.4 3.4h6.8c1.5 0 3.3-.9 3.6-3.4.3-2.1 1.6-12.4 1.9-15.2h1.4c.4 0 .8-.4.8-.8s-.4-.8-.9-.8zM7.8 2.6c0-.5.4-1 1-1h4.4c.5 0 1 .4 1 1v.3H7.8v-.3zm8.6 16.8c-.3 1.8-1.4 2.1-2.1 2.1H7.6c-1.1 0-1.6-.6-1.9-2.1-.2-.7-1.4-10.4-2-15h14.6c-.4 3-1.6 12.9-1.9 15z"
        />
        <path
          fill={color}
          d="M11 7.6c-.4 0-.8.4-.8.8V18c0 .4.3.8.8.8s.8-.4.8-.8V8.4c0-.4-.4-.8-.8-.8zM13.8 8.3l-.8 9.8c0 .4.3.8.7.8h.1c.4 0 .7-.3.8-.7l.8-9.8c0-.4-.3-.8-.7-.8-.5 0-.8.3-.9.7zM7.3 7.6c-.4.1-.7.4-.7.9l.8 9.8c0 .4.4.7.8.7h.1c.4 0 .7-.4.7-.8l-.8-9.9c-.1-.4-.4-.7-.9-.7z"
        />
      </svg>
    )
  }
}
