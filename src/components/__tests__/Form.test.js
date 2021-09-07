import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import { getByPlaceholderText, getByTestId } from "@testing-library/dom";

import Form from "../Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
    
  
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones" />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn()
    const { getByText } = render(<Form interviewers={interviewers} name="" onSave={onSave} />);
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { queryByText, getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} name="" onSave={onSave} />);

    fireEvent.click(getByText("Save"));
    // first click save without name property, make sure error message shows
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    const input = getByPlaceholderText("Enter Student Name");
    // then change input value and click save again, ensure that form submits
    fireEvent.change(input, { 
      target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByText("Save"));
    
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});

