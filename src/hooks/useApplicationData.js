import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // runs only on initial startup
  const getData = () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      console.log(all[0].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  };
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, appointments);
    })
  };
  
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview : null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      console.log(state);
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, appointments);
    })
  };

  const updateSpots = (apptId, appointments) => {
    const dayIndex = state.days.filter((day) => day.appointments.includes(apptId))[0].id - 1;
    const appts = state.days.filter((day) => day.appointments.includes(apptId))[0].appointments;
    const spotsRemaining = (5 - appts.filter((appt) => appointments[appt].interview).length);
    const daysArray = [...state.days];
    daysArray[dayIndex] = {...daysArray[dayIndex], spots: spotsRemaining};
    console.log('daysARray:', daysArray);
    setState(prev => ({ ...prev, days: [...daysArray]}));
  };

  // Call getData() ONLY ONCE. Without useEffect here, an infinite setState/re-render cycle will occur
  useEffect(() => {
    getData();
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
