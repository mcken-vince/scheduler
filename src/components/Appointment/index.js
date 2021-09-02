import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} />)}
      {mode === CREATE && (<Form onCancel={back} interviewers={props.interviewers} />)}
      {mode === CONFIRM && (<Confirm message="Are you sure you want to delete?" onConfirm={() => transition(DELETING)} onCancel={back} />)}
      {mode === DELETING && (<Status message="Deleting" onComplete={transition(EMPTY)} />)}
      {mode === SAVING && (<Status message="Saving" onComplete={transition(SHOW)} />)}
    </article>
  );
};

export default Appointment;