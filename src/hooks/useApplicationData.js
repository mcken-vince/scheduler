import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Responsible for making all GET/PUT/DELETE requests to server, keeps track of state as it is modified and serves it up to Application 
 * @returns {object} containing current state data and functions for Application to interact with state
 */
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /**
   * Fetch data from server, and update the state object. Runs only once on initial startup.
   */
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
  
  /**
   * Sets new value for state.day
   * @param {string} day string value of day => "Monday"
   */
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  /**
   * Make PUT request to server, and update state with modified data
   * @param {integer} id appointment id 
   * @param {object} interview object containing interview information
   * @returns {Promise} empty Promise
   */
  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, appointments);
    })
  };
  
  /**
   * Make DELETE request to server, and update state with modified data
   * @param {integer} id appointment id 
   * @returns {Promise} empty Promise
   */
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview : null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, appointments);
    })
  };

  /**
   * Calculate how many appointments are empty on the same day as the given modified appointment. Update state with current number of spots remaining
   * @param {integer} apptId appointment id 
   * @param {object} appointments containing latest appointments after modifications
   */
  const updateSpots = (apptId, appointments) => {
    // find the index of the day the updated appointment is on
    const dayIndex = state.days.filter((day) => day.appointments.includes(apptId))[0].id - 1;
    // appts = an array containing today's appointment slots
    const appts = state.days.filter((day) => day.appointments.includes(apptId))[0].appointments;
    // spotsRemaining = number of days where interview = null
    const spotsRemaining = (appts.filter((appt) => !appointments[appt].interview).length);
    
    const daysArray = [...state.days];
    daysArray[dayIndex] = {...daysArray[dayIndex], spots: spotsRemaining};
    setState(prev => ({ ...prev, days: [...daysArray]}));
  };

  // Call getData() ONLY ONCE. Without useEffect here, an infinite setState/re-render cycle will occur
  useEffect(() => {
    getData();
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
