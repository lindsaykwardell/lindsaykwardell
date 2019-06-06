import { mount } from "enzyme";
import React from "react";
import Row from "./Row";

describe("<Row /> - a flexbox row", () => {
  it("renders without crashing", () => {
    mount(<Row />);
  });

  it("has 'flex' class", () => {
    const row = mount(<Row />);

    expect(row.find("div").hasClass("flex")).toBe(true);
  });

  it("accepts classes", () => {
    const row = mount(<Row className="test-class" />);

    expect(row.find("div").hasClass("test-class")).toBe(true);
  });

  it("accepts styles", () => {
    const row = mount(<Row style={{ textAlign: "center" }} />);

    const styles = row.find("div").prop("style");
    expect(styles);
    expect(styles!.textAlign).toEqual("center");
  });

  it("renders children", () => {
    const row = mount(
      <Row>
        <div id="child" />
      </Row>
    );

    expect(row.find("div#child").exists()).toBe(true);
  });

  it("passes gutter to children", () => {
    const row = mount(
      <Row gutter={1}>
        <div />
      </Row>
    );

    const child = row.find("div.flex").childAt(0);

    expect(child.prop("gutter")).toEqual(1);
  });
});
