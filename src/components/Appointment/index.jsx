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
  // All possible modes are here
  // logic is handled by useVisualMode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  
  /**
   * Triggers SAVING transition, calls bookInterview function with given data, and then transitions to SHOW on success or ERROR_SAVE on error
   * @param {string} name name of student
   * @param {integer} interviewer interviewer id
   */
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));

  };

  /**
   * Triggers DELETING transition, calls cancelInterview with appointment id, and transitions to EMPTY on success or ERROR_DELETE on error
   * @param {integer} id appointment id 
   */
  const remove = (id) => {
    transition(DELETING);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)} />)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save} />)}
      {mode === CONFIRM && (<Confirm id={props.id} message="Are you sure you want to delete?" onConfirm={remove} onCancel={back} />)}
      {mode === DELETING && (<Status message="Deleting" onComplete={() => transition(EMPTY)} />)}
      {mode === SAVING && (<Status message="Saving" onComplete={() => transition(SHOW)} />)}
      {mode === EDIT && (<Form onCancel={back} onSave={save} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} name={props.interview.student} />)}
      {mode === ERROR_SAVE && (<Error message="Server error: could not save appointment" onClose={back} />)}
      {mode === ERROR_DELETE && (<Error message="Server error: could not delete appointment" onClose={back} />)}

    </article>
  );
};

export default Appointment;