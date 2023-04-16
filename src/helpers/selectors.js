export default function getAppointmentsForDay(state, name) {
  //I can also use find instead of filter
  const filteredDays = state.days.filter(day => day.name === name);
  // console.log("filteredDays: ",filteredDays);
  if(state.days.length===0 || filteredDays.length===0){
    return [];
  }

  //get the appointments
  const appointmentsFromDays = filteredDays[0].appointments;
  // const filtredAppointments = appointments.filter(appointment=>{
  //   return 
  // })
  let filteredAppointments = [];
  // console.log("appointments array: ",appointments);
  // for( let key in state.appointments){
  //   console.log("key inside appointments",key);
  // }
  for(let appointment of appointmentsFromDays) {
    // console.log("appointment",appointment);
    // filteredAppointments.push(appointment);
    filteredAppointments.push(state.appointments[appointment]);
    // for(let key in state.appointments) {
    //   if(appointment == key) {
    //     filteredAppointments.push(state.appointments[key]);
    //   }
    // }


  }
  return filteredAppointments;
}