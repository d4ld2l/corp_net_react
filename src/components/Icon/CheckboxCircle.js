import React from 'react'

export default ({ color, className, style, status }) => {
  switch (status) {
    case 'active':
      return (
        <svg className={className} style={style} viewBox="0 0 16 16">
          <circle className="circle-icon" cx="8" cy="8" r="8" fill="#575b97" />
          <path
            fill="#fff"
            d="M7.4 10.5c-.1 0-.3-.1-.4-.2L4.6 7.8c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l2 2.2 4.3-4.6c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.6 5c-.1 0-.2.1-.3.1z"
          />
        </svg>
      )
    case 'transparent':
      return (
        <svg className={className} style={style} viewBox="0 0 16 16">
          <circle className="circle-icon" cx="8" cy="8" r="7.5" fill={'transparent'}/>
          <path
            fill="#ccc"
            d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"
          />
          <path
            fill="#ccc"
            d="M7.4 10.5c-.1 0-.3-.1-.4-.2L4.6 7.8c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l2 2.2 4.3-4.6c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.6 5c-.1 0-.2.1-.3.1z"
          />
        </svg>
      )
    case 'dark':
      return (
        <svg className={className} style={style} viewBox="0 0 16 16">
          <circle className="circle-icon" cx="8" cy="8" r="8" fill="#a78de5" />
          <path
            fill="#fff"
            d="M7.4 10.5c-.1 0-.3-.1-.4-.2L4.6 7.8c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l2 2.2 4.3-4.6c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.6 5c-.1 0-.2.1-.3.1z"
          />
        </svg>
      )
    default :
      return (
        <svg className={className} style={style} viewBox="0 0 16 16">
          <circle className="circle-icon" cx="8" cy="8" r="7.5" fill="#fff" />
          <path
            fill="#ccc"
            d="M8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"
          />
          <path
            fill="#ccc"
            d="M7.4 10.5c-.1 0-.3-.1-.4-.2L4.6 7.8c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l2 2.2 4.3-4.6c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.6 5c-.1 0-.2.1-.3.1z"
          />
        </svg>
      )
  }
}
