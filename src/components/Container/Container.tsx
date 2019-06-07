import React, { CSSProperties, ReactNode } from "react"

interface Props {
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

const Container = (props: Props) => {
  return (
    <div
      className={`container mx-auto px-2`}
      style={{
        maxWidth: "1000px",
        marginBottom: "70px"
      }}
    >
      <div className={`mx-2 ${props.className}`} style={{ ...props.style }}>
        {props.children}
      </div>
    </div>
  )
}

export default Container
