import React from 'react';
import './styles.scss';
import Header from './Header';

const Appointment = (props) => {
  return (
    <article className="appointment">
      <Header time={props.time} />
    </article>
  );
};

export default Appointment;