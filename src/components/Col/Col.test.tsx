import { mount } from "enzyme";
import React from "react";
import Col from "./Col";

describe("<Col /> - a flexbox column", () => {
  it("renders without crashing", () => {
    mount(<Col />);
  });

  it("has 'flex-1' class by default", () => {
    const col = mount(<Col />);

    expect(col.find("div").hasClass("flex-1")).toBe(true);
  });

  it("accepts classes (overwrites flex-1)", () => {
    const col = mount(<Col className="test-class" />);

    expect(col.find("div").hasClass("test-class")).toBe(true);
    expect(col.find("div").hasClass("flex-1")).toBe(false);
  });

  it("adds p- class based on gutter", () => {
    const col = mount(<Col gutter={1} />);

    expect(col.find("div").hasClass("p-1")).toBe(true);
  });

  it("accepts styles", () => {
    const col = mount(<Col style={{ textAlign: "center" }} />);

    const styles = col.find("div").prop("style");
    expect(styles);
    expect(styles!.textAlign).toEqual("center");
  });

  it("renders children", () => {
    const col = mount(
      <Col>
        <div id="child" />
      </Col>
    );

    expect(col.find("div#child").exists()).toBe(true);
  });
});
