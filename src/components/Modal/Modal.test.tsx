import { mount } from "enzyme";
import React from "react";
import Modal from "./Modal";

describe("<Modal /> - a modal window", () => {
  it("renders without crashing", () => {
    mount(<Modal toggle={() => {}} />);
  });

  it("starts off screen", () => {
    const modal = mount(<Modal toggle={() => {}} show={false} />);

    expect(modal.find(".modal-window").exists()).toBe(false);
  });

  it("displays when active", () => {
    const modal = mount(<Modal toggle={() => {}} show={true} />);

    expect(modal.find(".modal-window").exists()).toBe(true);
  });

  it("has size option 'sm'", () => {
    const modal = mount(<Modal toggle={() => {}} size="sm" show={true} />);

    expect(modal.find(".modal-window").hasClass("modal-sm")).toBe(true);
  });

  it("has size option 'md'", () => {
    const modal = mount(<Modal toggle={() => {}} size="md" show={true} />);

    expect(modal.find(".modal-window").hasClass("modal-md")).toBe(true);
  });

  it("has size option 'lg'", () => {
    const modal = mount(<Modal toggle={() => {}} size="lg" show={true} />);

    expect(modal.find(".modal-window").hasClass("modal-lg")).toBe(true);
  });

  it("has size option 'full'", () => {
    const modal = mount(<Modal toggle={() => {}} size="full" show={true} />);

    expect(modal.find(".modal-window").hasClass("modal-full")).toBe(true);
  });

  it("renders children", () => {
    const container = mount(
      <Modal toggle={() => {}} show={true}>
        <div id="child" />
      </Modal>
    );

    expect(container.find("div#child").exists()).toBe(true);
  });
});
