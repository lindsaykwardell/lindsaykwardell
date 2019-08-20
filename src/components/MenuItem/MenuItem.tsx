import React, { ReactNode } from "react"
import {Button} from "react-tailwind-lib"
import { Link } from "gatsby"

interface Props {
  children: ReactNode
  to?: string
  href?: string
  toggle?: () => void
  text?: string
  align?: "left" | "right"
  closeOnClick?: boolean
  onClick?: () => void
}

const MenuItem = (props: Props) => {
  const closeMenuCheck = () => {
    if (props.toggle && (props.closeOnClick || window.innerWidth <= 768))
      props.toggle()
  }

  return (
    <div onClick={closeMenuCheck}>
      <Link to={props.to}>
        <Button
          color="none"
          text={props.text ? props.text : "white"}
          className={`block hover:underline w-full text-${
            props.align ? props.align : "left"
          }`}
          style={{ whiteSpace: "nowrap", fontFamily: "Lato" }}
          href={props.href}
          onClick={props.onClick}
        >
          {props.children}
        </Button>
      </Link>
    </div>
  )
}

export default MenuItem
