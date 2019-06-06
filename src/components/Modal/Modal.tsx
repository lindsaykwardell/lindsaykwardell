import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import ModalHeader from "./ModalHeader/ModalHeader";

interface Props {
  show?: boolean;
  size?: "sm" | "md" | "lg" | "full";
  toggle: (val: boolean) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  header?: ReactNode;
}

const Modal = (props: Props) => {
  const [modalPos, setModalPos] = useState<number>(props.show ? 10 : -20);
  const [bgOpacity, setBgOpacity] = useState<number>(props.show ? 0.3 : 0);
  const [display, setDisplay] = useState<boolean>(props.show ? true : false);

  useEffect(() => {
    if (props.show) {
      setDisplay(true);
      setTimeout(() => {
        setModalPos(80);
        setBgOpacity(0.3);
        document.body.style.overflow = "hidden";
      }, 20);
    } else {
      setModalPos(-200);
      setBgOpacity(0);
      document.body.style.overflow = "auto";
      setTimeout(() => {
        setDisplay(false);
      }, 400);
    }
  });

  if (display) {
    return (
      <div>
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "#222222",
            opacity: bgOpacity,
            zIndex: 100,
            transition: "0.4s",
            overflow: "hidden"
          }}
          onMouseDown={() => props.toggle(false)}
        />
        <div
          style={{
            position: "fixed",
            width: "100%",
            left: 0,
            top: 0,
            opacity: 1,
            zIndex: 5000
          }}
          onMouseDown={() => props.toggle(false)}
        >
          <div
            className={`modal-window modal-${props.size} rounded shadow-md ${
              props.className ? props.className : ""
            }`}
            style={{
              position: "relative",
              top: `${modalPos}px`,
              background: "white",
              margin: "0 auto",
              minHeight: props.show ? "100px" : "0px",
              maxHeight: "80vh",
              transition: "0.4s",
              opacity: props.show ? 1 : 0,
              zIndex: 5000,
              ...props.style
            }}
            onMouseDown={e => e.stopPropagation()}
          >
            {props.header ? (
              <ModalHeader toggle={props.toggle}>{props.header}</ModalHeader>
            ) : (
              <div />
            )}
            {props.children}
          </div>
          <div style={{ height: "25px" }} />
        </div>
      </div>
    );
  } else return <div />;
};

export default Modal;
