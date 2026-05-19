/* Minimal Lucide-style icon set, hand-rolled to avoid the lucide-react import */

const ICON_PATHS = {
  'square-pen': {
    viewBox: '0 0 16 16',
    strokeWidth: 1.33333,
    content: (
      <>
        <path d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8" />
        <path d="M12.25 1.75C12.5152 1.48478 12.8749 1.33578 13.25 1.33578C13.6251 1.33578 13.9848 1.48478 14.25 1.75C14.5152 2.01521 14.6642 2.37493 14.6642 2.75C14.6642 3.12507 14.5152 3.48478 14.25 3.75L8.24133 9.75933C8.08303 9.9175 7.88747 10.0333 7.67267 10.096L5.75733 10.656C5.69997 10.6727 5.63916 10.6737 5.58127 10.6589C5.52339 10.6441 5.47055 10.614 5.4283 10.5717C5.38604 10.5294 5.35592 10.4766 5.34109 10.4187C5.32626 10.3608 5.32727 10.3 5.344 10.2427L5.904 8.32733C5.96702 8.1127 6.08302 7.91737 6.24133 7.75933L12.25 1.75Z" />
      </>
    ),
  },
  search: {
    viewBox: '0 0 16 16',
    strokeWidth: 1.33333,
    content: (
      <>
        <path d="M14 14L11.1067 11.1067" />
        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" />
      </>
    ),
  },
  'book-marked': {
    viewBox: '0 0 16 16',
    strokeWidth: 1.33333,
    content: (
      <>
        <path d="M10.6667 4L13.3333 13.3333" />
        <path d="M8 4V13.3333" />
        <path d="M5.33333 5.33333V13.3333" />
        <path d="M2.66667 2.66667V13.3333" />
      </>
    ),
  },
  'chevrons-up-down': (
    <>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </>
  ),
  'panel-left-close': (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </>
  ),
  'file-text': (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
  'more-horizontal': (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </>
  ),
  'message-square': (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  copy: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  'thumbs-up': (
    <>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7l-4-4V12a3 3 0 0 1 3-3h2.74l3.93-7.41a.83.83 0 0 1 1.18-.35l1.66 1.04A3 3 0 0 1 16.83 6L15 5.88Z" />
    </>
  ),
  'thumbs-down': (
    <>
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-3.24a2 2 0 0 0-1.79 1.11L9.93 22a.83.83 0 0 1-1.18.35l-1.66-1.04A3 3 0 0 1 7.17 18L9 18.12Z" />
    </>
  ),
  'refresh-cw': (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  share: (
    <>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </>
  ),
  paperclip: (
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.8l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  ),
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'log-out': (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
};

function Icon({ name, size = 16, className = '', strokeWidth, style }) {
  const entry = ICON_PATHS[name];
  if (!entry) {
    console.warn('Unknown icon:', name);
    return null;
  }
  // Two forms: a plain JSX fragment (default 24x24, stroke-width 2) OR an object
  // with {viewBox, strokeWidth, content} for icons exported at other scales.
  const isCustom = entry && typeof entry === 'object' && 'content' in entry && entry.content !== undefined;
  const inner = isCustom ? entry.content : entry;
  const viewBox = isCustom ? entry.viewBox : '0 0 24 24';
  const sw = strokeWidth ?? (isCustom ? entry.strokeWidth : 2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {inner}
    </svg>
  );
}

Object.assign(window, { Icon });
