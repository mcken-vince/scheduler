import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';

const Appointment = (props) => {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Show 
        student={props.student} 
        interviewer={props.interviewer} 
        onEdit={()=>{}}
        onDelete={()=>{}}  
      />
    </article>
  );
};

export default Appointment;