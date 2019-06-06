import React, { CSSProperties, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  gutter?: number;
  style?: CSSProperties;
}

const Col = (props: Props) => {
  return (
    <div
      className={`${props.gutter ? `p-${props.gutter}` : ""} ${
        props.className ? props.className : "flex-1"
      }`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Col;
