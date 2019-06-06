import React, { CSSProperties, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
}

const Container = (props: Props) => {
  return (
    <div
      className="container mx-auto px-2"
      style={{ maxWidth: "1200px", ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default Container;
