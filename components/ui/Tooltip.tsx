'use client'
import { useState } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  position?: TooltipPosition
  children: React.ReactNode
}

const wrapperStyles: Record<TooltipPosition, string> = {
  top:    'flex flex-col items-center gap-3',
  bottom: 'flex flex-col-reverse items-center gap-3',
  left:   'flex flex-row items-center gap-3',
  right:  'flex flex-row-reverse items-center gap-3',
}

const arrowStyles: Record<TooltipPosition, React.CSSProperties> = {
  top:    { position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'6px solid var(--color-text-primary)' },
  bottom: { position:'absolute', top:-5,   left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderBottom:'6px solid var(--color-text-primary)' },
  left:   { position:'absolute', right:-5, top:'50%',  transform:'translateY(-50%)', width:0, height:0, borderTop:'6px solid transparent', borderBottom:'6px solid transparent', borderLeft:'6px solid var(--color-text-primary)' },
  right:  { position:'absolute', left:-5,  top:'50%',  transform:'translateY(-50%)', width:0, height:0, borderTop:'6px solid transparent', borderBottom:'6px solid transparent', borderRight:'6px solid var(--color-text-primary)' },
}

export function Tooltip({ content, position = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={['relative inline-flex', wrapperStyles[position]].join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {visible && (
        <div
          role="tooltip"
          className="relative px-2.5 py-1.5 rounded-[var(--radius-sharp)] bg-[var(--color-text-primary)] text-[var(--color-bg-page)] text-xs font-medium whitespace-nowrap"
          style={{ zIndex: 'var(--z-dropdown)' }}
        >
          {content}
          <span style={arrowStyles[position]} aria-hidden="true" />
        </div>
      )}
      {children}
    </div>
  )
}
