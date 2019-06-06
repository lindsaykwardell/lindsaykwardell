import React, { CSSProperties, ReactNode, useState } from "react"
import { useDebounce } from "use-debounce"

interface Props {
  label: string
  children: ReactNode
  style?: CSSProperties
}

const Tooltip = (props: Props) => {
  const [MouseLoc, setMouseLoc] = useState<{ x: number; y: number }>()
  const [IsHovering, setIsHovering] = useState<boolean>(false)
  const IsStillHovering = useDebounce(IsHovering, 500)

  const onMouseMove = (e: any) => {
    if (e.clientX && e.clientY) setMouseLoc({ x: e.clientX, y: e.clientY })
    else setMouseLoc(undefined)
  }

  return (
    <span
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onMouseMove={onMouseMove}
    >
      {props.children}
      {IsHovering && IsStillHovering && MouseLoc && (
        <div
          style={{
            fontSize: "0.7rem",
            background: "black",
            padding: "2px",
            color: "white",
            ...props.style,
            position: "fixed",
            top: `${MouseLoc.y + 20}px`,
            left: `${MouseLoc.x}px`,
          }}
        >
          {props.label}
        </div>
      )}
    </span>
  )
}

export default Tooltip
