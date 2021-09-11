import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

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
    const { getByText } = render(
      <Form interviewers={interviewers} name="" onSave={onSave} />);
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that an interviewer has been selected", () => {
    const onSave = jest.fn()
    const { getByText } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" onSave={onSave} />);
    fireEvent.click(getByText("Save"));

    expect(getByText(/an interviewer must be selected/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    
  })

  it("can successfully save after trying to submit an empty student name, and then trying to submit without selecting an interviewer", () => {
    const onSave = jest.fn();
    const { queryByText, getByText, getByPlaceholderText, getByAltText } = render(
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
    
    expect(getByText(/an interviewer must be selected/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/an interviewer must be selected/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} name="" onSave={onSave} onCancel={onCancel} />);
    
    const input = getByPlaceholderText("Enter Student Name");
    const saveButton = getByText("Save");
    const cancelButton = getByText("Cancel");

    fireEvent.click(saveButton);
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    fireEvent.change(input, { 
      target: { value: "Lydia Miller-Jones" } });
  
    fireEvent.click(cancelButton);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);

  });

});

