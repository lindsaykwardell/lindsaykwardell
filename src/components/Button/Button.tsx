import { Link } from "gatsby"
import React, { CSSProperties, ReactNode } from "react"

interface Props {
  children?: ReactNode
  href?: string
  to?: string
  id?: string
  className?: string
  color?: string
  text?: string
  underline?: boolean
  onClick?: () => void
  style?: CSSProperties
  size?: "na" | "sm" | "md" | "lg"
  disabled?: boolean
  label?: boolean
  htmlFor?: string
  submit?: boolean
}

const Button = (props: Props) => {
  let buttonSize = "py-2 px-4"

  switch (props.size) {
    case "na":
      buttonSize = ""
      break
    case "sm":
      buttonSize = "py-1 px-2 text-xs"
      break
    case "md":
      buttonSize = "py-3 px-5"
      break
    case "lg":
      buttonSize = "py-3 px-5 text-lg"
      break
    default:
      buttonSize = "py-2 px-4"
  }

  const className = `bg-${
    props.disabled
      ? "gray-500"
      : props.color
      ? `${props.color}-500`
      : "blue-500"
  } hover:bg-${
    props.disabled ? "gray" : props.color ? props.color : "blue"
  }-700 text-${
    props.text ? props.text : props.color === "none" ? "black" : "white"
  } ${
    props.color !== "none"
      ? "shadow hover:shadow-md"
      : props.text
      ? `hover:text-${props.text}${
          props.text && props.text.indexOf("dark") > -1 ? "er" : "-dark"
        }`
      : "hover:text-gray-700"
  } font-light ${
    props.underline ? "underline" : "no-underline"
  } ${buttonSize} rounded ${props.className ? props.className : ""}`

  if (props.to) {
    return (
      <Link to={props.to}>
        <button
          id={props.id}
          className={className}
          style={{ ...props.style, transition: "0.2s" }}
        >
          {props.children}
        </button>
      </Link>
    )
  }

  if (props.href) {
    return (
      <a
        href={props.href}
        id={props.id}
        className={className}
        style={{ ...props.style, transition: "0.2s" }}
      >
        {props.children}
      </a>
    )
  }

  if (props.label) {
    return (
      <label
        className={className}
        onClick={props.onClick}
        style={{
          ...props.style,
          transition: "0.2s",
          cursor: "pointer",
          fontSize: "auto",
          textTransform: "none",
          fontFamily: "Roboto",
        }}
        htmlFor={props.htmlFor}
      >
        {props.children}
      </label>
    )
  }

  if (props.submit) {
    return (
      <input
        type="submit"
        id={props.id}
        className={className}
        onClick={props.onClick}
        onMouseDown={e => e.stopPropagation()}
        style={{ ...props.style, transition: "0.2s" }}
        disabled={props.disabled}
        value={props.children.toString()}
      />
    )
  }

  return (
    <button
      id={props.id}
      className={className}
      onClick={props.onClick}
      onMouseDown={e => e.stopPropagation()}
      style={{ ...props.style, transition: "0.2s" }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
