import { mount } from "enzyme";
import React from "react";
import Container from "./Container";

describe("<Container /> - a centered container element", () => {
  it("renders without crashing", () => {
    mount(<Container />);
  });

  it("renders children", () => {
    const container = mount(
      <Container>
        <div id="child" />
      </Container>
    );

    expect(container.find("div#child").exists()).toBe(true);
  });
});
