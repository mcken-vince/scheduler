import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "../Appointment/index";

afterEach(cleanup);

describe("Appointment", () => {
  // const interview = {
  //   interview: { student: "Archie Cohen", interviewer: 2 }
  // }

  it("renders without crashing", () => {
    render(<Appointment />);
  });

});

