const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function IconMonitor({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

export function IconScan({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M7 2H4a2 2 0 0 0-2 2v3M17 2h3a2 2 0 0 1 2 2v3M7 22H4a2 2 0 0 1-2-2v-3M17 22h3a2 2 0 0 0 2-2v-3" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  )
}

export function IconShield({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconFile({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  )
}

export function IconWrench({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

export function IconBike({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 17.5V14l-3-3 4-3 2 3h3" />
    </svg>
  )
}

export function IconCheck({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  )
}

export function IconStore({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M3 9l1-4h16l1 4" />
      <path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path d="M9 21V13h6v8" />
      <path d="M3 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 3 3" />
    </svg>
  )
}

export function IconClipboard({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 2h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V2zM9 12h6M9 16h4" />
    </svg>
  )
}

export function IconHandshake({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M20 11a2 2 0 0 0-2-2h-1l-3-3H9L6 9H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1l1 2h10l1-2h1a2 2 0 0 0 2-2v-4z" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  )
}

export function IconTrendUp({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
      <path d="M22 7l-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  )
}
