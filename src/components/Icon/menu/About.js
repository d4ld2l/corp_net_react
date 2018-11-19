import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 21 20">
    <g transform="translate(0 -.982)">
      <defs>
        <filter id="a" width="20" height="20" x="0" y="1" filterUnits="userSpaceOnUse">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
        </filter>
      </defs>
      <path
        fill={color}
        d="M19 9.6v8.8c0 .8-.6 1.4-1.4 1.5h-.1c-.8 0-1.5-.7-1.5-1.5V6h3v3.6zM13.7 20H3c-1.1 0-2-.9-2-2V2h14v16.5c0 .6.2 1.1.5 1.5h-1.8zM19 5h-3V2c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v16c0 1.7 1.3 3 3 3h14.5c1.4 0 2.5-1.1 2.5-2.5V6c0-.5-.4-1-1-1z"
        mask="url(#b)"
      />
    </g>
    <path
      fill={color}
      d="M12.5 3.5h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5m0 2h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5m0 2h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5m0 2h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5m0 2h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5m0 2h-9c-.3 0-.5.3-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5"
    />
  </svg>
)
