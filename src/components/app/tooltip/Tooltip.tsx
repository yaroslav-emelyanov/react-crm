import React, { useRef } from 'react'

interface Props {
  title: string
}

const Tooltip: React.FC<Props> = ({ children, title }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseOver = () => {
    if (ref.current) {
      const tooltip = M.Tooltip.getInstance(ref.current)
      if (!tooltip) {
        M.Tooltip.init(ref.current, { html: title })
      } else {
        tooltip.open()
      }
    }
  }
  return (
    <div
      ref={ref}
      style={{ width: 'fit-content' }}
      onMouseOver={handleMouseOver}
    >
      {children}
    </div>
  )
}

export default Tooltip
