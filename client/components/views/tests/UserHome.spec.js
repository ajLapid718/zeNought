/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { UserHomeView } from "../../views";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("UserHomeView", () => {
  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHomeView email="cody@email.com" />);
  });

  it("renders the email in an h3", () => {
    expect(userHome.find("h3").text()).to.be.equal("Welcome, cody@email.com");
  });
});
