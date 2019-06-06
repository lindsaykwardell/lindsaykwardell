import { mount } from "enzyme";
import React from "react";
import Button from "./Button";

describe("<Button /> - button component", () => {
  it("renders without crashing", () => {
    mount(<Button />);
  });

  it("is a button element by default", () => {
    const button = mount(<Button />);

    expect(button.find("button").exists()).toBe(true);
  });

  it("has default classes", () => {
    const button = mount(<Button />);

    expect(button.find("button").hasClass("py-2")).toBe(true);
    expect(button.find("button").hasClass("px-4")).toBe(true);
    expect(button.find("button").hasClass("bg-blue")).toBe(true);
    expect(button.find("button").hasClass("hover:bg-blue-dark")).toBe(true);
    expect(button.find("button").hasClass("text-white")).toBe(true);
    expect(button.find("button").hasClass("shadow")).toBe(true);
    expect(button.find("button").hasClass("hover:shadow-md")).toBe(true);
    expect(button.find("button").hasClass("no-underline")).toBe(true);
  });

  it("has size option 'sm'", () => {
    const button = mount(<Button size="sm" />);

    expect(button.find("button").hasClass("py-1")).toBe(true);
    expect(button.find("button").hasClass("px-2")).toBe(true);
    expect(button.find("button").hasClass("text-xs")).toBe(true);
  });

  it("has size option 'lg'", () => {
    const button = mount(<Button size="lg" />);

    expect(button.find("button").hasClass("py-3")).toBe(true);
    expect(button.find("button").hasClass("px-5")).toBe(true);
    expect(button.find("button").hasClass("text-lg")).toBe(true);
  });

  it("accepts color options for bg color", () => {
    const button = mount(<Button color="red" />);

    expect(button.find("button").hasClass("bg-red")).toBe(true);
    expect(button.find("button").hasClass("hover:bg-red-dark")).toBe(true);
  });

  it("accepts 'none' option for color", () => {
    const button = mount(<Button color="none" />);

    expect(button.find("button").hasClass("bg-none")).toBe(true);
    expect(button.find("button").hasClass("hover:bg-none-dark")).toBe(true);
    expect(button.find("button").hasClass("text-black"));
    expect(button.find("button").hasClass("hover:text-grey-dark")).toBe(true);
  });

  it("accepts 'text' option for text color", () => {
    const button = mount(<Button text="blue" />);

    expect(button.find("button").hasClass("text-blue"));
  });

  it("applies correct hover classes when bg is none", () => {
    const button = mount(<Button color="none" text="blue" />);

    expect(button.find("button").hasClass("hover:text-blue-dark")).toBe(true);
    expect(button.find("button").hasClass("shadow")).toBe(false);
  });

  it("accepts 'underline' option", () => {
    const button = mount(<Button underline />);

    expect(button.find("button").hasClass("underline")).toBe(true);
    expect(button.find("button").hasClass("no-underline")).toBe(false);
  });

  it("accepts classes", () => {
    const button = mount(<Button className="test-class" />);

    expect(button.find("button").hasClass("test-class")).toBe(true);
  });

  it("accepts styles", () => {
    const button = mount(<Button style={{ width: "100px" }} />);

    const style = button.find("button").prop("style");
    expect(style);
    expect(style!.width).toEqual("100px");
  });

  it("renders text", () => {
    const button = mount(<Button>Text</Button>);

    expect(button.text()).toEqual("Text");
  });

  it("runs a function on click", () => {
    let triggered = false;
    const trigger = () => (triggered = true);

    const button = mount(<Button onClick={() => trigger()} />);

    button.find("button").simulate("click");

    expect(triggered).toBe(true);
  });
});
