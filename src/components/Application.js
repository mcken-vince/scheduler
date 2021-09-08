import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';


export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // create array of today's appointments as JSX Appointment components
  const appointments = dailyAppointments.map(appointment => {
    return (<Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />);
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
