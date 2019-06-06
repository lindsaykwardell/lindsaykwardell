import { mount } from "enzyme";
import React from "react";
import Card from "./Card";

describe("<Card /> - a card component", () => {
  it("renders without crashing", () => {
    mount(<Card />);
  });

  it("accepts classes", () => {
    const card = mount(<Card className="test-class" />);

    expect(card.find("div").hasClass("test-class")).toBe(true);
  });

  it("accepts styles", () => {
    const card = mount(<Card style={{ textAlign: "center" }} />);

    const styles = card.find("div").prop("style");
    expect(styles);
    expect(styles!.textAlign).toEqual("center");
  });

  it("renders children", () => {
    const card = mount(
      <Card>
        <div id="child" />
      </Card>
    );

    expect(card.find("div#child").exists()).toBe(true);
  });
});
