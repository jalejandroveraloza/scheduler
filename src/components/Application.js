
import React from "react";
import useApplicationData from "hooks/useApplicationData";
//import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

//Appointment Data
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Archie Cohen",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  //Replacing all the above individual states with the following: 
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  //let dailyAppointments = getAppointmentsForDay(state, state.day);

  // const setDay = day => {
  //   console.log("day from setDay:", day);
  //   return setState({ ...state, day })};

  // setState(prev => ({ ...prev, days }));
  // const setDays = (days) => {
    
  //   setState(prev => setState({...prev, days}));
  // }

  
  //   Promise.all([
  //     axios.get(dayURL),
  //     axios.get(appointmentURL),
  //     axios.get(interviewersURL)
  //   ]).then((all) =>{
      
  //     setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
  // },[]);


  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };


  //   const url =`http://localhost:8001/api/appointments/${id}`;

  //   let req={
  //     url,
  //     method: 'PUT',
  //     data: appointment
  //   }
  //   return axios(req).then(response => {
  //     console.log("response from axios put=====>", response.data);
  //     setState({...state, appointments})
  //   })

  // }

  // function cancelInterview(id){
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   const url =`http://localhost:8001/api/appointments/${id}`;

  //   let req={
  //     url,
  //     method: 'DELETE',
  //     data:appointment
  //   }
  //   return axios(req).then(response =>{
  //     console.log("response from delete axios===>",response);
  //     setState({...state, appointments});
  //   })

  // }


  let appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state,state.day)

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});

  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   },
  // ];
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/*dailyAppointments.map(appointment =>{
          //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
          return <Appointment key={appointment.id} {...appointment} />
        })*/}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
