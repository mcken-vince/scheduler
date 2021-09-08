
/**
 * Transforms state object into an array containing only appointments on a given day
 * @param {object} state example => state: {day:[string], days: [array], appointments: {object}, interviewers: {object}
 * @param {string} day string value of day => "Monday"
 * @returns {array} an array of objects representing appointments taking place on given day
 */
const getAppointmentsForDay = (state, day) => {
  const appointmentsArray = [];
  const days = [...state.days];
  const appointments = { ...state.appointments };
  const today = days.filter((d) => d.name === day);
  // if requested day is in appointments, return all the appointments for today
  const todaysApps = today[0] && today[0].appointments;
  // if there are appointments, push them to appointmentsArray
  todaysApps && todaysApps.map((app => appointmentsArray.push(appointments[app])));

  return appointmentsArray;
};

/**
 * Combines given interview information with interviewer information from state before handing off to Appointment component
 * @param {object} state example => state: {day:[string], days: [array], appointments: {object}, interviewers: {object}
 * @param {object} interview contains information about interview]
 * @returns {object} containing full details of appointment, ready to be handed to Appointment component
 */
const getInterview = (state, interview) => {
  // short-circuit if there is no interview scheduled
  if (!interview) return null;
  
  let result;
  const interviewer = state.interviewers[interview.interviewer];
  // check if interviewer is in list of interviewers
  if (interviewer) {
    result = ({
      ...interview,
      interviewer: {
        id: interviewer.id,
        name: interviewer.name,
        avatar: interviewer.avatar
      }
    })
  } else {
    result = null;
  }
  
  return result;
};

/**
 * 
 * @param {object} state example => state: {day:[string], days: [array], appointments: {object}, interviewers: {object}
 * @param {string} day string value of day => "Monday"
 * @returns {array} containing array with complete information of all interviewers scheduled on given day
 */
const getInterviewersForDay = (state, day) => {
  const interviewersArray = [];
  const days = [...state.days];
  const interviewers = { ...state.interviewers };
  const today = days.filter((d) => d.name === day);
  // if there are interviewers today, pass the array to todaysInterviewers
  const todaysInterviewers = today[0] && today[0].interviewers;
  // map through todaysInterviewers ids and use them to get interviewers full information from state.interviewers
  todaysInterviewers && todaysInterviewers.map((i => interviewersArray.push(interviewers[i])));

  return interviewersArray;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
