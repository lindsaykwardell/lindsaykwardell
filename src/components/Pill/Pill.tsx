import React, { CSSProperties, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  to?: string;
  className?: string;
  color?: string;
  text?: string;
  underline?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  size?: "sm" | "md" | "lg";
  label?: boolean;
}

const Pill = (props: Props) => {
  let pillSize = "py-1 px-2 text-xs";

  switch (props.size) {
    case "sm":
      pillSize = "py-1 px-2 text-xs";
      break;
    case "md":
      pillSize = "py-2 px-4";
      break;
    case "lg":
      pillSize = "py-3 px-5 text-lg";
      break;
    default:
      pillSize = "py-1 px-2 text-xs";
  }

  const className = `bg-${props.color ? props.color : "grey"} hover:bg-${
    props.color ? props.color : "grey"
  }-dark text-${
    props.text ? props.text : props.color === "none" ? "black" : "white"
  } ${
    props.color !== "none"
      ? "shadow hover:shadow-md"
      : props.text
      ? `hover:text-${props.text}-darker`
      : "hover:text-grey-dark"
  } font-light ${
    props.underline ? "underline" : "no-underline"
  } ${pillSize} rounded-full ${props.className ? props.className : ""}`;

  return (
    <div
      className={className}
      onClick={props.onClick}
      style={{ ...props.style, display: "inline-block", transition: "0.2s" }}
    >
      {props.children}
    </div>
  );
};

export default Pill;
