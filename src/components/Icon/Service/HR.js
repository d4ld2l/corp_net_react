// @flow

import React from 'react'

export default ({ className, color, style }) => (
  <svg style={style} className={className} viewBox="0 0 15 19">
    <path
      fill={color}
      d="M13.5 6.21h-.33c-.76 0-1.38.62-1.38 1.38v.3c0 .28.22.5.5.5h.58s.01 2.24.01 2.51-.08.45-.3.45c-.01 0-.03.01-.04.01-.21-.42-.64-.72-1.14-.72H3.6c-.5 0-.93.3-1.14.72-.01 0-.03-.01-.04-.01-.21 0-.29-.13-.29-.38V8.39h.58c.28 0 .5-.22.5-.5v-.3c0-.76-.62-1.38-1.38-1.38H1.5c-.76 0-1.38.62-1.38 1.38v.3c0 .28.22.5.5.5h.5v2.65c0 .71.41 1.28 1.26 1.3.17.51.64.88 1.21.88h2.7v.69c0 .2.12.37.29.45v1.1l-3.5 1.05c-.14.04-.24.14-.3.25-.4.17-.69.57-.69 1.03 0 .61.5 1.11 1.12 1.11.61 0 1.11-.5 1.11-1.11 0-.21-.07-.39-.17-.56l2.74-.83c.05 0 .08-.02.11-.04v.45c-.36.19-.61.55-.61.98 0 .61.5 1.11 1.12 1.11.61 0 1.11-.5 1.11-1.11 0-.43-.25-.8-.61-.98v-.45c.03.02.06.04.09.05l2.74.83c-.1.17-.17.35-.17.56 0 .61.5 1.11 1.12 1.11.61 0 1.11-.5 1.11-1.11 0-.46-.28-.86-.69-1.03-.06-.12-.16-.21-.3-.25l-3.5-1.05v-1.1c.17-.08.28-.25.28-.45v-.69h2.71c.57 0 1.03-.37 1.21-.88.85-.02 1.27-.8 1.27-1.37V8.39h.5c.28 0 .5-.22.5-.5v-.3c-.01-.76-.63-1.38-1.38-1.38zm-12 1h.33c.13 0 .25.07.32.18h-.96c.06-.11.18-.18.31-.18zm6.19 6.2h-.38v-.11h.38v.11zm-4.58 4.38c0-.06.05-.12.12-.12.06 0 .11.05.11.12 0 .13-.23.13-.23 0zm4.28 0c0-.06.05-.12.12-.12.06 0 .11.05.11.12-.01.13-.23.13-.23 0zm4.27 0c0-.06.05-.12.12-.12s.11.05.11.12c0 .13-.23.13-.23 0zm-.26-5.57H3.6c-.16 0-.29-.13-.29-.29 0-.16.13-.29.29-.29h7.79c.16 0 .29.13.29.29.01.16-.12.29-.28.29zm1.76-5.01h.33c.13 0 .25.07.32.18h-.97c.07-.11.19-.18.32-.18z"
    />
    <path
      fill={color}
      d="M3.7 8.66c0 .06-.03.62.38 1.05.19.21.56.45 1.19.45h4.47c.63 0 .99-.25 1.18-.45.39-.42.38-.95.37-.95l.62-4.53c.01-.07.36-1.76-.77-2.81C10.19.53 8.42.57 6.86.59H6.6C5.52.57 4.8.55 3.86 1.42c-1.13 1.05-.79 2.74-.78 2.77l.62 4.47zm.84-6.51c.53-.49.88-.57 1.56-.57.14 0 .3 0 .48.01h.3c1.3-.02 2.93-.05 3.58.56.71.67.48 1.86.47 1.91l-.63 4.66s0 .19-.11.3c-.09.09-.24.14-.46.14H5.26c-.15 0-.34-.02-.45-.13-.11-.12-.11-.32-.11-.41l-.63-4.6c-.01-.01-.24-1.21.47-1.87z"
    />
  </svg>
)
