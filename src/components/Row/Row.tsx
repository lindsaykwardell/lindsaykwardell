import React, { CSSProperties, ReactElement } from "react";

interface Props {
  children?: Array<ReactElement<any>> | ReactElement<any>;
  className?: string;
  gutter?: number;
  style?: CSSProperties;
  default?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

const Row = (props: Props) => {
  const children = React.Children.map(props.children!, child => {
    return React.cloneElement(child, {
      gutter: props.gutter
    });
  });
  return (
    <div
      className={`${props.default ? props.default : "flex"} ${
        props.className ? props.className : ""
      }`}
      style={props.style}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      {children}
    </div>
  );
};

export default Row;
