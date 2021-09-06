import { useState } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  // runs only on initial startup
  const getData = () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  };

  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      setState({ ...state, appointments });
    })
  };

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id] };
    const appointments = { ...state.appointments, appointment };

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({ ...state, appointments })
    })
  };
  getData();
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;