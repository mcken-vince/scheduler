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

export { getAppointmentsForDay, getInterview };

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };