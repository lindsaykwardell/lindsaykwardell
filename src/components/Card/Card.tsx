import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
  type?: "flat" | "material"
  onMouseOut?: () => void
  onMouseOver?: () => void
  bg?: string
  border?: string
}

const Card = (props: Props) => {
  let classes = ""

  switch (props.type) {
    case "flat":
      classes = `p-2 rounded ${
        props.border ? `border-${props.border}` : "border"
      } ${props.bg ? `bg-${props.bg}` : "bg-white"} ${
        props.className ? props.className : ""
      }`
      break
    case "material":
    default:
      classes = `p-2 rounded ${
        props.border ? `border-${props.border}` : ""
      } shadow-md ${props.bg ? `bg-${props.bg}` : "bg-white"} ${
        props.className ? props.className : ""
      }`
  }

  return (
    <div
      className={classes}
      id={props.id}
      style={{ ...props.style }}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      {props.children}
    </div>
  )
}

export default Card
