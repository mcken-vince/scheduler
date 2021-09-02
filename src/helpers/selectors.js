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

const getInterviewersForDay = (state, day) => {
  const interviewersArray = [];
  const days = [...state.days];
  const interviewers = { ...state.interviewers };
  const today = days.filter((d) => d.name === day);
  // if requested day is in appointments, return all the appointments for today
  const todaysInterviewers = today[0] && today[0].interviewers;
  // if there are appointments, push them to appointmentsArray
  todaysInterviewers && todaysInterviewers.map((i => interviewersArray.push(interviewers[i])));

  return interviewersArray;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
