import React from 'react'

export default ({ color, className, style }) => (
  <svg style={style} className={className} viewBox="0 0 22 22">
    <path fill={color} d="M11.77 4.84c.58 0 .87.33.87 1 0 .69-.31 1.03-.94 1.03-.57 0-.85-.34-.85-1.03-.01-.66.3-1 .92-1m-.2 4.57c.13 0 .23.05.29.14.07.09.1.27.1.52v.12c0 .04-.01.08-.02.14L11 14.79c-.02.13-.05.26-.07.38-.02.12-.04.24-.04.35 0 .2.05.3.14.3.13 0 .41-.24.84-.71l.2.37c-.13.19-.29.39-.47.59-.18.2-.38.38-.58.54-.2.16-.4.29-.6.39-.2.1-.37.15-.52.15-.19 0-.31-.07-.36-.2-.05-.13-.07-.28-.07-.44 0-.06 0-.11.01-.14.01-.04.01-.08.03-.12l1-5.25c.01-.02.02-.06.02-.11 0-.09-.04-.14-.11-.14-.13 0-.41.24-.84.73l-.21-.39c.13-.19.29-.38.48-.58.19-.2.39-.37.59-.53.2-.16.4-.29.61-.4.19-.12.37-.17.52-.17m.2-5.57c-1.17 0-1.93.78-1.93 2 0 1.5 1 2.03 1.85 2.03 1.18 0 1.94-.8 1.94-2.03.01-1.21-.73-2-1.86-2zm-.2 4.57c-.32 0-.65.09-1 .28-.25.13-.51.3-.76.5-.24.19-.47.4-.68.62-.23.23-.42.47-.59.71-.21.31-.23.71-.05 1.04l.21.39c.11.21.3.37.52.45l-.69 3.62c-.02.07-.03.14-.04.19-.01.05-.02.16-.02.29 0 .28.04.55.13.79.19.52.69.85 1.29.85.3 0 .62-.08.96-.26.26-.13.52-.3.78-.5.24-.19.48-.41.7-.65.21-.23.4-.47.56-.69.21-.31.23-.7.06-1.03l-.2-.37c-.13-.24-.34-.42-.6-.5l.76-3.61c.03-.16.04-.27.04-.35v-.12c0-.47-.09-.82-.28-1.09-.23-.35-.64-.56-1.1-.56z" />
    <path fill={color} d="M11 1c5.52 0 10 4.48 10 10s-4.48 10-10 10S1 16.52 1 11 5.48 1 11 1m0-1C4.93 0 0 4.93 0 11s4.93 11 11 11 11-4.93 11-11S17.07 0 11 0z" />
  </svg>
)
