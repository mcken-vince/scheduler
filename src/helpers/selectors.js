const getAppointmentsForDay = (state, day) => {
  const appointmentsArray = [];
  const days = [ ...state.days ];
  const appointments = { ...state.appointments };
  const today = days.filter((d) => d.name === day);
  // if requested day is in appointments, return all the appointments for today
  const todaysApps = today[0] && today[0].appointments;
  // if there are appointments, push them to appointmentsArray
  todaysApps && todaysApps.map((app => appointmentsArray.push(appointments[app])));

  return appointmentsArray;
};

export default getAppointmentsForDay;