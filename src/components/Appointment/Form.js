import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [ error, setError ] = useState("");
  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  /**
   * [Resets input field, selected-interviewer, and clears error state]
   */
  const reset = () => {
    setName("");
    setInterviewer(null);
    setError("");
  };

  /**
   * [Calls reset and onCancel functions. Solely a function of convenience]
   */
  const cancel = () => {
    reset(); 
    props.onCancel();
  }

  /**
   * [Validates input field, if field is empty set error state, if not empty pass form data to onSave function] 
   */
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={e => e.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name ? name : ""}
            onChange={e => setName(e.target.value)}
          /*
            This must be a controlled component
          */
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;