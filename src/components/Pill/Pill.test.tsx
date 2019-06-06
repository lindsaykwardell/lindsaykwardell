import { mount } from "enzyme";
import React from "react";
import Pill from "./Pill";

describe("<Pill /> - pill component", () => {
  it("renders without crashing", () => {
    mount(<Pill />);
  });

  it("has default classes", () => {
    const wrapper = mount(<Pill />);

    expect(wrapper.find("div").hasClass("py-1")).toBe(true);
    expect(wrapper.find("div").hasClass("px-2")).toBe(true);
    expect(wrapper.find("div").hasClass("text-xs")).toBe(true);
    expect(wrapper.find("div").hasClass("bg-grey")).toBe(true);
    expect(wrapper.find("div").hasClass("hover:bg-grey-dark")).toBe(true);
    expect(wrapper.find("div").hasClass("text-white")).toBe(true);
    expect(wrapper.find("div").hasClass("shadow")).toBe(true);
    expect(wrapper.find("div").hasClass("hover:shadow-md")).toBe(true);
    expect(wrapper.find("div").hasClass("no-underline")).toBe(true);
  });

  it("has size option 'sm'", () => {
    const wrapper = mount(<Pill size="sm" />);

    expect(wrapper.find("div").hasClass("py-1")).toBe(true);
    expect(wrapper.find("div").hasClass("px-2")).toBe(true);
    expect(wrapper.find("div").hasClass("text-xs")).toBe(true);
  });

  it("has size option 'md'", () => {
    const wrapper = mount(<Pill size="md" />);

    expect(wrapper.find("div").hasClass("py-2")).toBe(true);
    expect(wrapper.find("div").hasClass("px-4")).toBe(true);
  });

  it("has size option 'lg'", () => {
    const wrapper = mount(<Pill size="lg" />);

    expect(wrapper.find("div").hasClass("py-3")).toBe(true);
    expect(wrapper.find("div").hasClass("px-5")).toBe(true);
    expect(wrapper.find("div").hasClass("text-lg")).toBe(true);
  });

  it("accepts color options for bg color", () => {
    const wrapper = mount(<Pill color="red" />);

    expect(wrapper.find("div").hasClass("bg-red")).toBe(true);
    expect(wrapper.find("div").hasClass("hover:bg-red-dark")).toBe(true);
  });

  it("accepts 'none' option for color", () => {
    const wrapper = mount(<Pill color="none" />);

    expect(wrapper.find("div").hasClass("bg-none")).toBe(true);
    expect(wrapper.find("div").hasClass("hover:bg-none-dark")).toBe(true);
    expect(wrapper.find("div").hasClass("text-black"));
    expect(wrapper.find("div").hasClass("hover:text-grey-dark")).toBe(true);
  });

  it("accepts 'text' option for text color", () => {
    const wrapper = mount(<Pill text="blue" />);

    expect(wrapper.find("div").hasClass("text-blue"));
  });

  it("applies correct hover classes when bg is none", () => {
    const wrapper = mount(<Pill color="none" text="blue" />);

    expect(wrapper.find("div").hasClass("hover:text-blue-darker")).toBe(true);
    expect(wrapper.find("div").hasClass("shadow")).toBe(false);
  });

  it("accepts 'underline' option", () => {
    const wrapper = mount(<Pill underline />);

    expect(wrapper.find("div").hasClass("underline")).toBe(true);
    expect(wrapper.find("div").hasClass("no-underline")).toBe(false);
  });

  it("accepts classes", () => {
    const wrapper = mount(<Pill className="test-class" />);

    expect(wrapper.find("div").hasClass("test-class")).toBe(true);
  });

  it("accepts styles", () => {
    const wrapper = mount(<Pill style={{ width: "100px" }} />);

    const style = wrapper.find("div").prop("style");
    expect(style);
    expect(style!.width).toEqual("100px");
  });

  it("renders text", () => {
    const wrapper = mount(<Pill>Text</Pill>);

    expect(wrapper.text()).toEqual("Text");
  });

  it("runs a function on click", () => {
    let triggered = false;
    const trigger = () => (triggered = true);

    const wrapper = mount(<Pill onClick={() => trigger()} />);

    wrapper.find("div").simulate("click");

    expect(triggered).toBe(true);
  });
});
