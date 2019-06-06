import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../Button/Button";

interface Props {
  toggle: (val: boolean) => void;
  children: ReactNode;
}

const ModalHeader = (props: Props) => (
  <div className="bg-daimler rounded-t mb-2">
    <Button
      className="float-right"
      color="none"
      text="white"
      size="lg"
      onClick={() => props.toggle(false)}
    >
      <FaTimes />
    </Button>

    {props.children}
  </div>
);

export default ModalHeader;
