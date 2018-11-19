import React from 'react'

export default ({ color, className, style, fat }) => {
  if (fat) {
    return (
      <svg style={style} className={className} viewBox="0 0 10 10">
        <path
          fill={color}
          d="M5.7 5L9.8.9c.2-.2.2-.5 0-.7S9.3 0 9.1.1L5 4.3.9.1C.7 0 .3 0 .1.1S0 .7.1.9L4.3 5 .1 9.1c-.1.2-.1.6 0 .8.1.1.3.1.4.1s.3 0 .4-.1L5 5.7l4.1 4.1c.1.2.3.2.4.2s.3 0 .4-.1c.2-.2.2-.5 0-.7L5.7 5z"
        />
      </svg>
    )
  } else {
    return (
      <svg style={style} className={className} viewBox="0 0 20 20">
        <path
          fill={color}
          d="M10.8 10l9-9c.2-.2.2-.6 0-.8-.2-.2-.6-.2-.8 0l-9 9-9-9C.8 0 .4 0 .2.2 0 .4 0 .8.2 1l9 9-9 9c-.2.2-.2.6 0 .8.1.1.3.2.4.2.1 0 .3-.1.4-.2l9-9 9 9c.1.1.3.2.4.2.1 0 .3-.1.4-.2.2-.2.2-.6 0-.8l-9-9z"
        />
      </svg>
    )
  }
}
